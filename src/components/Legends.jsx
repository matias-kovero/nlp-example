import React from 'react';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

function Legends(props) {
  return(
    <Col sm={8} className='text-left mb-3 pl-0'>
      {props.data.map((type, i) => 
      <Badge className='mr-2' pill variant={props.colors[i]} key={i}>{type}</Badge>
    )}
    </Col>
  )
}
export default Legends;