import React from 'react';
import ContentWrapper from './Wrapper'
import Img from '../Img'
import LoadingGif from './loading.gif'

export default function Loading({title='正在加载'}) {
  return (
    <ContentWrapper>
      <Img src={LoadingGif} />
      <p className='desc'>{title}</p>
    </ContentWrapper>
  )
}


