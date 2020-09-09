import Loading from '../../compontents/Loading'
import React from 'react'
import styled from 'styled-components'

const LoadingWapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`

export default function () {
  return (
    <LoadingWapper>
      <Loading/>
    </LoadingWapper>
  )
}











