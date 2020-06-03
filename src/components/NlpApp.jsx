import React, { useState, useEffect } from 'react';
import nlp from '../api/wex-nlp';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import ResultBox from './ResultBox';
import TextArea from './TextArea';
import Legends from './Legends';
import Button from './Button';

// Using Bootstrap default colors.
// !!! Maxium facets, legends = colors.length !!!
const colors = ['primary', 'success', 'danger', 'warning', 'info'];

const analyzeText = async(text) => {
  var response = await nlp.analyze(text);
  var data = response.enriched.ALLA[0].annotations;
  // Array contains the whole sentence we don't need it.
  var cleaned = data.filter(ann => ann.text === ann.properties.facetval);
  var facetTypes = [...new Set(cleaned.map(x => x.type))];
  cleaned = cleaned.map(obj => { return {...obj, color: colors[facetTypes.indexOf(obj.type)]} });
  console.log(cleaned);
  return { results: cleaned, types: facetTypes };
}

function TextBox(props) {
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('Write text here and press analyze...');
  const [results, setResult] = useState([]);
  const [facetTypes, setFacetTypes] = useState([]);

  useEffect(() => {
    if(isLoading) {
      analyzeText(text).then((data) => {
        setResult(data.results);
        setFacetTypes(data.types);
        setLoading(false);
      }).catch(error => {
        console.log(error); 
        setLoading(false)
      });
    }
  }, [isLoading, text]);


  const handleClick = (e) => {
    e.preventDefault();
    if(results.length) {
      setResult([]); // Remove colors
      setFacetTypes([]); // Remove Legends
      }
    else setLoading(true);
  };

  const handleChange = (e) => setText(e.target.value);

  return(
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
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
            <Legends data={facetTypes} colors={colors} />
            <Button
              disabled={isLoading}
              onClick={handleClick}
              data={results}
              bg={props.formColor}
              color={props.textColor}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default TextBox;