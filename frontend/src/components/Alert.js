import React from 'react'

const Alert = (props) => { 
  
  return (
    <div style={{height : "60px"}}>
    { props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible `} role="alert">
   {props.alert.message}
  </div>}
  </div>
  )
}

export default Alert
