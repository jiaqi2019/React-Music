import {createGlobalStyle} from 'styled-components'


const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: normal;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, menu, nav, section{
  display: block;
}

body{
  line-height: 1;
  // overflow: hidden;
}
blockquote, q{
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after{
  content: none;
}
table{
  border-collapse: collapse;
  border-spacing: 0;
}

/* custom */

a{
  color: #7e8c8d;
  -webkit-backface-visibility: hidden;
  text-decoration: none;
}

li{
  list-style: none
}

body{
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}

body, html{
  line-height : 1;
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: #222;
  color: #fff;
}


`

export default GlobalStyle;