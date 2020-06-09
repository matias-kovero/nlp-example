import React from 'react';
import Table from 'react-bootstrap/Table';

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

function TableElement(props) {
  let borders = ColorLuminance(props.bg, 0.1);
  return(
    <div className='text-left hide-scroll result-table'>
      <Table bordered variant='dark' style={{borderColor: borders, background: props.bg }}>
        <thead>
          <tr>
            <th style={{borderColor: borders}}>Type</th>
            <th style={{borderColor: borders}}>Text</th>
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0 ? props.data.map((word, i) => 
            <tr key={i}>
              <td style={{borderColor: borders}}>{word.type}</td>
              <td style={{borderColor: borders}}>{word.text}</td>
            </tr>): 
            <tr><td className='text-muted text-center'>Please analyze text to get results here</td><td></td></tr>}
        </tbody>
      </Table>
    </div>
  )

}
/**
 <Table striped bordered variant='dark'>
      <thead>
        <tr>
          <th>Type</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody style={{overflow: 'scroll'}}>
        {props.data.map((word, i) => <tr key={i}><td>{word.type}</td><td>{word.text}</td></tr>)}
      </tbody>
    </Table>
 */
export default TableElement;