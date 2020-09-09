import React from 'react';
import styled from 'styled-components'

//类似与V-show

const Wrapper = styled.div`
  display: ${props => props.show ? '' : 'none'} ;
`;

function conditionDiv(props, ref) {
  const { children, show, ...restProps } = props
  let rest = {}
  if (show) {
    rest = restProps
  }
  return <Wrapper show={show} ref={ref} {...rest}>{children}</Wrapper>
}



export default React.forwardRef(conditionDiv)