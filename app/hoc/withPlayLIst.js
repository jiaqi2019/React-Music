import React, { useEffect } from 'react';
import { connect } from 'react-redux'

export default function withPlayList(WrapCompent) {
  function mixinPlayList(props) {
    return <WrapCompent {...props}/>
  }
  function mapStateToProps(state) {
    return {
      playlist :state.playerReducer.playlist
    }
  }
  return connect(mapStateToProps, null)(mixinPlayList)
}



