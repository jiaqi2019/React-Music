import { useEffect } from "react";


// 当有音乐播放时，底部mini播放器，会遮挡部分内容，需调整页面布局
const MINI_HEIGHT = 60 + 'px'

export function useHandlePlayList(playList, callback) {
  useEffect(() => {
    callback(playList, MINI_HEIGHT)
  },[])
  useEffect(() => {
    callback(playList, MINI_HEIGHT)
  }, [playList])
}







