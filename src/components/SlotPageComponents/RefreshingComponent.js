import React from 'react'

const RefreshingComponent = (props) =>  <div style={{marginBottom : props.shouldRefresh===true ? '1px' : '0px'}}>{props.children}</div>

export default RefreshingComponent