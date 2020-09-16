import React from 'react';


export default function ListItem(props) {
  const {item,children, ...restProps} = props
  return (
    // item可以让其通过属性添加内容,最好应该是用render props的方式实现
    <li {...restProps}>{item || children }</li>
  )
}