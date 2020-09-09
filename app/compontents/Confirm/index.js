import React from 'react';
import Wrapper from './Wrapper'

export default function Confirm(props) {
  const {
    showflg = false,
    title = '是否清空历史',
    cancleTxt = '取消',
    okTxt = "确定",
    cancle = ()=>{},
    ok = ()=>{},
  } = props

  // const [showflg, setShowflg] = useState(false)
  function onCancle(e) {
    e.stopPropagation()
    cancle()
  }
  function onOk(e) {
    e.stopPropagation()
    ok()
  }

  return (
    <Wrapper show={showflg}>
      <div className= "confirm-locaton">
        <div className="confirm-content">
          <div className="title">{title}</div>
          <div className="options">
              <span className="cancle btn" onClick={onCancle}>{cancleTxt}</span>
              <span className="ok btn" onClick={onOk}>{okTxt}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}



