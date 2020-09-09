import {getMusicList} from '../../api/rank'
import {createSong, processSongsUrl} from '../../common/js/song'


export async function loadSongList(id) {
  const res = await getMusicList(id)
  let songs = await processSongsUrl(_normalizeData(res.songlist))
  return [res.topinfo.ListName, songs]
} 

function _normalizeData(list){
  let res = []
  for(const song of list){
      if(song.data.songid && song.data.albumid){
          res.push(createSong(song.data))
      }
  }
  return res
}











