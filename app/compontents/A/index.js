
import React from 'react';

export default function A({href, children}) {
  return (
    <a href={href}>
      {children}
    </a>
  )
}
