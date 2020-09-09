import React from 'react';


export default function ListItem(props) {
  const {item,children, ...restProps} = props
  return (
    <li {...restProps}>{item || children }</li>
  )
}