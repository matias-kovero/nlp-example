import React from 'react';
import Form from 'react-bootstrap/Form';

function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

function TextBox(props) {
  let borders = ColorLuminance(props.bg, -0.2);
  return(
    <Form.Group controlId="nlp-input">
      <Form.Control 
        className='shadow-none'
        as="textarea" 
        rows="4" 
        value={props.value} 
        onChange={props.onChange} 
        style={{backgroundColor: props.bg, color: props.color, borderColor: borders}}
      />
    </Form.Group>
  )
}
export default TextBox;