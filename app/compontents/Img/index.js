import React from 'react';

export default function Img(props) {
  const { src = "", alt = "", ...resProps } = props
  return (
    <img src={src} alt={alt} {...resProps}/>
  )
}

