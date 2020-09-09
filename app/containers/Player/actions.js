import * as types from './constans'
import playMode from '../../common/js/config'
import { shuffle } from '../../common//js/util'

import {saveFavorite, deleteFavorite, savePlayHis } from '../../common/js/cache'



export const selectSong = (list, index) => {
  return (dispatch, getState) => {
    let playlist = list
    // 如果播放模式为随机播放，需要打乱palylist， 并重新获得palyidnex
    if (getState().playerReducer.mode === playMode.random) {
      playlist = shuffle(playlist)
      index = playlist.findIndex((item) => item.id === list[index].id)
    }
    dispatch(makePlayList(playlist))
    dispatch(makeSequenceList(list))
    dispatch(makePlaying(true))
    dispatch(makeFullScreen(true))
    dispatch(makeCurrentIndex(index))
  }
}

export const randomPlayAll = (list) => {
  return (dispatch) => {

    dispatch(makePlayList(shuffle(list)))
    dispatch(makeSequenceList(list.slice()))
    dispatch(makePlaying(true))
    dispatch(makeFullScreen(true))
    dispatch(makeCurrentIndex(0))
    dispatch(makeMode(playMode.random))
  }
}

export const addFavoriteSongs = (song) => {
  return (dispatch) => {
    dispatch(makeFavoriteSongs(saveFavorite(song)))
  }
}

export const deleteFavoriteSongs = (song) => {
  // console.log('delet');
  return (dispatch) => {
    dispatch(makeFavoriteSongs(deleteFavorite(song)))
  }
}

export const insertSong = function (song) {
  return (dispatch, getState) => {

    let playlist = getState().playerReducer.playlist.slice()
    let seqlist = getState().playerReducer.secquenceList.slice()
    let curIndex = getState().playerReducer.currentIndex;
    let currentSong = playlist[curIndex]


    let fpindex = findIndex(playlist, song);
    curIndex += 1;
    playlist.splice(curIndex, 0, song)
    if (fpindex > -1) {
      if (curIndex > fpindex) {
        curIndex--;
        playlist.splice(fpindex, 1)
      } else {
        playlist.splice(fpindex + 1, 1)
      }
    }

    let cursindex = findIndex(seqlist, currentSong) + 1
    let fsindex = findIndex(seqlist, song)

    seqlist.splice(cursindex, 0, song)
    if (fsindex > -1) {
      if (cursindex > fsindex) {
        seqlist.splice(fsindex, 1)
      } else {
        seqlist.splice(fsindex + 1, 1)
      }
    }

    dispatch(makeSequenceList(seqlist))
    dispatch(makePlayList(playlist))
    dispatch(makeCurrentIndex(curIndex))
    dispatch(makePlaying(true))
    dispatch(makeFullScreen(true))
  }

}

export const deleteSongList = () => {
  return (dispatch) => {
    dispatch(makeCurrentIndex(-1))
    dispatch(makePlaying(false))
    dispatch(makePlayList([]))
    dispatch(makeSequenceList([]))
  }
}

export const deleteOneSong = (song) => {
  return (dispatch, getState) => {

    let sequeceList = getState().playerReducer.secquenceList.slice()
    let playlist = getState().playerReducer.playlist.slice()
    let curIndex = getState().playerReducer.currentIndex

    let seqIndex = findIndex(sequeceList, song)
    sequeceList.splice(seqIndex, 1)
    // console.log({ sequeceList });

    let delPlayIndex = findIndex(playlist, song)
    playlist.splice(delPlayIndex, 1)
    // console.log({ curIndex, delPlayIndex, seqIndex });

    if (delPlayIndex < curIndex || curIndex === playlist.length) {
      curIndex--
    }
    // console.log({ curIndex });


    dispatch(makeCurrentIndex(curIndex))
    dispatch(makePlayList(playlist))
    dispatch(makeSequenceList(sequeceList))
    dispatch(makePlaying(!!playlist.length))
  }
}

function findIndex(list, song) {
  if (!song || !song.id) return -1;
  return list.findIndex(item => item.id === song.id)
}

export const savePlayHistory = (arg) => {
  return (dispatch) => {
    dispatch(makePlayHistory(savePlayHis(arg)))
  }
}


export function makeMode(value) {
  return { type: types.SET_MODE, value }
}
export function makePlaying(value) {
  return { type: types.SET_PLAYING, value }
}
export function makeCurrentSong(value) {
  return { type: types.SET_CURRENT_SONG, value }
}

export function makePlayList(value) {
  return { type: types.SET_PLAYLIST, value }
}
export function makeSequenceList(value) {
  return { type: types.SET_SECQUENCE_LIST, value }
}
export function makeFullScreen(value) {
  return { type: types.SET_FULL_SCREEN, value }
}
export function makeCurrentIndex(value) {
  return { type: types.SET_CURRENT_INDEX, value }
}
export function makeFavoriteSongs(value) {
  return { type: types.SET_FAVORITE_SONGS, value }
}
export function makePlayHistory(value) {
  return { type: types.SET_PLAY_HISTORY, value }
}








