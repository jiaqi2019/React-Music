import React from 'react';


function List(props, ref) {
  const {component:ComponetToRender, ...restProps} = props
  let content = ComponetToRender
  if (props.items) {
    content = props.items.map((item, index) => (
      // <ComponetToRender key={item[props.key] || index} item={item} index={index}/>
      props.component(item, index)
    ))
  } 

  return <ul ref={ref} {...restProps}>{content}</ul>
}


export default React.forwardRef(List)
















