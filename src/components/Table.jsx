import React from 'react';
import Table from 'react-bootstrap/Table';

function TableElement(props) {

return(
  <Table striped bordered variant='dark' className='col-sm-8'>
    <thead>
      <tr>
        <th>Type</th>
        <th>Text</th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((word, i) => <tr key={i}><td>{word.type}</td><td>{word.text}</td></tr>)}
    </tbody>
  </Table>
)

}

export default TableElement;