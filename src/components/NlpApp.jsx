import React, { useState, useEffect } from 'react';
import nlp from '../api/wex-nlp';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ButtonRb from 'react-bootstrap/Button';

import ResultBox from './ResultBox';
import TextArea from './TextArea';
import Legends from './Legends';
import Button from './Button';

const analyzeText = async(text, colors) => {
  var response = await nlp.analyze(text);
  var location = Object.keys(response.enriched);
  var data = response.enriched[location][0].annotations; // Making asumptions it will be on the 0 element
  // Array contains the whole sentence we don't need it.
  var cleaned = data.filter(ann => ann.text === ann.properties.facetval);
  var facetTypes = [...new Set(cleaned.map(x => x.type))];
  cleaned = cleaned.map(obj => { return {...obj, color: colors[facetTypes.indexOf(obj.type)]} });
  return { results: cleaned, types: facetTypes };
}

function NlpApp(props) {
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('Write text here and press analyze...');
  const [results, setResult] = useState([]);
  const [facetTypes, setFacetTypes] = useState([]);
  const [rngSentence, updateRngSentece] = useState(0);

  useEffect(() => {
    if(isLoading) {
      analyzeText(text, props.colors).then((data) => {
        setResult(data.results);
        setFacetTypes(data.types);
        setLoading(false);
      }).catch(error => {
        console.log(error); 
        setLoading(false)
      });
    }
  }, [isLoading, text, props.colors]);


  const handleClick = (e) => {
    e.preventDefault();
    if(results.length) {
      setResult([]); // Remove colors
      setFacetTypes([]); // Remove Legends
      }
    else setLoading(true);
  };

  const randomText = (e) => {
    e.preventDefault();
    let len = props.sentences.length;
    let getNext = rngSentence + 1;
    setText(props.sentences[rngSentence]);
    getNext >= len ? updateRngSentece(0) : updateRngSentece(getNext);
  }

  const handleChange = (e) => setText(e.target.value);

  return(
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={11} xl={12} >
          <Form>
            {results.length ?
              <ResultBox 
                data={results} 
                text={text}
                bg={props.formColor} 
                color={props.textColor}
              /> :
              <TextArea 
                value={text} 
                onChange={handleChange} 
                bg={props.formColor} 
                color={props.textColor}
              />
            }
            <Legends data={facetTypes} colors={props.colors} bg={props.formColor} />
            <Button
              disabled={isLoading}
              onClick={handleClick}
              data={results}
              bg={props.formColor}
              color={props.textColor}
            />
            <ButtonRb 
              style={{color: props.textColor, backgroundColor: props.formColor, borderColor: props.formColor}}
              disabled={isLoading || results.length}
              size='sm'
              className='float-left ml-2 shadow-none' 
              type='button'
              onClick={!props.isLoading ? randomText : null}>
              Sample
            </ButtonRb>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default NlpApp;