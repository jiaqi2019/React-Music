import styled from 'styled-components'


const Icon = styled.div`
    width: 30px;
    height: 32px;
    display: inline-block;
    line-height: 44px;
    vertical-align: top;
    background-image: url(${props => require(props.bgsrc + "@2x.png").default });
    @media all and (-webkit-min-device-pixel-ratio: 3) and (min-device-pixel-ratio: 3){
      background-image: url(${props =>require(props.bgsrc + "@3x.png").default});
    }
    background-size: 30px 32px;
    margin-top: 6px;
    margin-right: 9px;
`
export default Icon





