import styled from 'styled-components'


const SlideGroup = styled.div`
  white-space: nowrap;
  display: inline-block;
  .slide-item{
      float: left;
      box-sizing: border-box;
      text-align: center;
      a{
          display: block;
          width: 100%;
          text-decoration: none;
      }
      img{
          display: block;
          width: 100%;
      }
  }
 
`

export default SlideGroup