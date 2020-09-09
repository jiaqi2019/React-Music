import {getSingerDetail} from '../../api/singer'
import {processSongsUrl, createSong} from '../../common/js/song'


export async function loadSongs(id) {
  let res = await getSingerDetail(id)
  let songs = []
  if (res.data) {
    songs = res.data.list
  }
  songs = await processSongsUrl(_normalizeData(songs))
  return songs
}

function _normalizeData(list){
  let res = []
  list.forEach(item=>{
      res.push(createSong(item.musicData))
  })
  return res
}













