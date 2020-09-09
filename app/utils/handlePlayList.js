import { useEffect } from "react";


const MINI_HEIGHT = 60 + 'px'

export function useHandlePlayList(playList, callback) {
  useEffect(() => {
    callback(playList, MINI_HEIGHT)
  },[])
  useEffect(() => {
    callback(playList, MINI_HEIGHT)
  }, [playList])
}







