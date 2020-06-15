// Route requests to a dummy client since CP4D doesn't support CORS
const host = `${window.location.href}proxy`; // Check setupProxy.js
const collectionId = process.env.REACT_APP_COLLECTION_ID;
const collection_field = process.env.REACT_APP_COLLECTION_FIELD;

function handleErrors(response) {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
/**
 * Analyze given text with WEX NLP
 * @param {String} body 
 */
const analyze = async(body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            [collection_field]: body
          }
        })
      };
      fetch(`${host}/api/v1/collections/${collectionId}/analyze`, requestOptions)
      .then(handleErrors)
      .then(response => resolve(response.json()))
      .catch(error => reject(error))
    } catch (error) {
      reject(error.message);
    }
  });
}

export default {
  analyze: analyze
}