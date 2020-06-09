import React from 'react';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

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

function Legends(props) {

  const updateFilter = (type) => {
    props.onClick(type);
  }

  return(
    <Col xs={12} className='text-left mb-3 pl-0 small'>
      {props.data.map((type, i) => 
      <Badge 
        className='mr-2 custom-pill' 
        pill 
        style={props.filter.includes(type) ? {backgroundColor: props.colors[i]} : {backgroundColor: ColorLuminance(props.colors[i], -0.6)}} 
        key={i}
        onClick={() => updateFilter(type)}>{type}</Badge>
      )}
    </Col>
  )
}
export default Legends;