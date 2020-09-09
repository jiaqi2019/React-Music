import * as types from './constans'
import playMode from '../../common/js/config'
import { loadFavorite, loadPlayHis } from '../../common/js/cache'
import Song from '../../common/js/song'

const initialState = {
  // 音乐播放组件通信
  mode: playMode.sequence,  //播放模式
  playing: false,           //播放状态
  playlist: [],            //播放列表
  secquenceList: [],       //原始顺序列表
  fullScreen: false,       //是否全屏
  currentIndex: -1,       //当前歌曲的列表索引
  currentSong: { },
  favoriteSongs: loadFavorite().map(song=>new Song(song)),     //收藏歌曲

  //localstroge相关
  playHistory: loadPlayHis().map(song => new Song(song)),
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_MODE:
      return { ...state, mode: action.value }
    case types.SET_PLAYING:
      return { ...state, playing: action.value }
    case types.SET_PLAYLIST:
      return { ...state, playlist: action.value }
    case types.SET_SECQUENCE_LIST:
      return { ...state, secquenceList: action.value }
    case types.SET_FULL_SCREEN:
      return { ...state, fullScreen: action.value }
    case types.SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.value }
    case types.SET_FAVORITE_SONGS:
      return { ...state, favoriteSongs: action.value }
    case types.SET_PLAY_HISTORY:
      return { ...state, playHistory: action.value }
    default:
      return state
  }
}

















