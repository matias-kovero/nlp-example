import React from 'react';
import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types'

function CustomButton(props) {
  return(
    <Button 
      style={{color: props.color, backgroundColor: props.bg, borderColor: props.bg}}
      variant='dark'
      disabled={props.disabled}
      size='sm'
      className={'float-left shadow-none ' + (props.className || '')} 
      onClick={!props.disabled ? props.onClick : null}>
      { props.disabled ? 
      <div className="spinner-border spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div> : props.data.length ? 'Edit Text' : 'Analyze Text' }
    </Button>
  )
}
export default CustomButton;