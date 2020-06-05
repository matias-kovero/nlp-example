import config from '../config.json';
// Route requests to a dummy client since CP4D doesn't support CORS
const host = `${window.location.href}proxy`; // Check setupProxy.js
const collectionId = process.env.REACT_APP_COLLECTION_ID;

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
          //'Authorization': `Basic ${TOKEN}`// moved to setupProxy.js
        },
        body: JSON.stringify({
          fields: {
            [config.apiField]: body
          }
        })
      };
      fetch(`${host}/api/v1/collections/${collectionId}/analyze`, requestOptions)
      .then(handleErrors)
      .then(response => resolve(response.json()))
      .catch(error => reject(error))
      //resolve(data);
    } catch (error) {
      reject(error.message);
    }
  });
}

export default {
  analyze: analyze
}