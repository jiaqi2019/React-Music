import React from 'react';
import Wrapper from './Wrapper'

export default function ProgressCircle({ percent, radius, children }) {
  const dashArray = 100 * Math.PI
  const dashOffset = dashArray * (1 - percent)

  return (
    <Wrapper className="progress-circle">
      <svg width={radius} height={radius} viewBox='0 0 100 100' version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx='50' cy='50' r='50' fill='transparent' className="progress-background"></circle>
        <circle cx='50' cy='50' r='50'
            className="progress"
            fill='transparent' 
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}>
        </circle>
      </svg>
      {children}
    </Wrapper>
  )
}