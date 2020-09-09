import { processSongsUrl, createSong } from '../../common/js/song'
import { getSongList } from '../../api/recommend'


export async function loadSongs(id){
  let res = await getSongList(id)
  let songs = await processSongsUrl(_normalizeData(res.cdlist[0].songlist))
  return songs  
}

function _normalizeData(list) {
  let res = []
  list.forEach(item => {
    res.push(createSong(item))
  })
  return res
}