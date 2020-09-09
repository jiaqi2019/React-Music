import {jsonP} from '../common/js/jsonp'
import {commonParams, options} from './config'

export function getRank(){
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    const data = Object.assign({}, commonParams, {
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    })
    return jsonP(url, data, options)
}


export function getMusicList (topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  
    const data = Object.assign({}, commonParams, {
      topid,
      needNewCode: 1,
      uin: 0,
      tpl: 3,
      page: 'detail',
      type: 'top',
      platform: 'h5'
    })
  
    return jsonP(url, data, options)
  }
  