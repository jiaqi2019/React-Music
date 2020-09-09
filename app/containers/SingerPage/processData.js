import { HOT_NAME, HOT_SINGER_LEN} from './constants'
import {getSingerList} from '../../api/singer'
import Singer from '../../common/js/singer'


export async function LoadSingerList() {
  let res = await getSingerList()
  let list = _sortSingerList(res.data.list)
  return list
}

function _sortSingerList(list){
  let top10 = {
    title: HOT_NAME,
    items:[]
  };
  let sortByName = []
  let map = {}
  for (const [index, val] of list.entries()){
    let singer = new Singer(val.Fsinger_mid, val.Fsinger_name)
    if(index < HOT_SINGER_LEN){
        // map[hot].items.push(singer)
        top10.items.push(singer)
    }
    let key = val.Findex.toUpperCase()
    if(!map[key]){
        map[key] = {
            title: key,
            items: []
        }
    }
    map[key].items.push(singer)
  }

  for(const key in map){
      if(key.match(/[a-zA-Z]/)){
          sortByName.push(map[key])
      }
  }
  sortByName.sort((a,b)=>{
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })
  return [top10, ...sortByName]
}