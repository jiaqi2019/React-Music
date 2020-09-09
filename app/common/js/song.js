import { getLyric, getSongsUrl } from '../../api/song'
import { ERR_OK } from '../../api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor ({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.filename = `C400${this.mid}.m4a`
    this.url = url
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: musicData.url
    url: getSongUrl((index++%10))
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function isValidMusic (musicData) {
  return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}

export function processSongsUrl (songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return getSongsUrl(songs).then((purlMap) => {
    songs = songs.filter((song) => {
      const purl = purlMap[song.mid]
      if (purl) {
        song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
        return true
      }
      return false
    })
    return songs
  })
}


function getSongUrl(index){
  return url[index]
}





let index = 0

const url=[
  'http://tyst.migu.cn/public/product8th/product38/2020/03/2516/2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/60054701900162347.mp3?key=c58a8bf6587e2585&Tim=1593744935229&channelid=00&msisdn=0f47261ba6b247949c4e551d29dcbce7&CI=600547019002600902000006889458&F=000009',

  'http://tyst.migu.cn/public/product5th/product34/2019/07/2320/2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/60054701921.mp3?key=e053ce973952ab84&Tim=1593744840352&channelid=00&msisdn=98b4a51496dc49d1875892dfb842e43b&CI=600547019212600902000006889374&F=000009',

  `http://tyst.migu.cn/public/product8th/product40/2020/05/0918/2017%E5%B9%B404%E6%9C%8828%E6%97%A511%E7%82%B912%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%A4%A9%E6%B5%A9%E7%9B%9B%E4%B8%961%E9%A6%96/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/63261202497184438.mp3?key=5a03dc69a6d5c82c&Tim=1593745024768&channelid=00&msisdn=dad8fd6fb0404f05b964490252630451&CI=632612024972600908000005216626&F=000009`,

  'http://tyst.migu.cn/public/ringmaker01/n17/2017/07/2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/%E7%94%9C%E7%94%9C%E7%9A%84-%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3?key=614bff47bda14a4a&Tim=1593745064700&channelid=00&msisdn=c51d8951578b42a99d736539d3e9e8da&CI=600547019972600902000006889066&F=000009',

  'http://tyst.migu.cn/public/ringmaker01/n16/2016/10/2016%E5%B9%B410%E6%9C%8818%E6%97%A515%E7%82%B940%E5%88%86%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E4%B8%AD%E8%A7%86%E5%8D%8E%E5%BD%B139%E9%A6%96/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/%E5%8F%AA%E7%89%B5%E4%BD%A0%E7%9A%84%E6%89%8B-%E6%9D%8E%E7%8E%96%E5%93%B2.mp3?key=89b2204735559970&Tim=1593745087777&channelid=00&msisdn=df52fca5f4ea48bfa51308a5d01cdb81&CI=632670015242600908000003964364&F=000009',

  'http://tyst.migu.cn/public/product5th/product27/2018/12/29/2016%E5%B9%B410%E6%9C%8817%E6%97%A510%E7%82%B955%E5%88%86%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E4%B8%AD%E8%A7%86%E5%8D%8E%E5%BD%B1%E9%A2%84%E7%95%9935%E9%A6%96/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/63880601357.mp3?key=57d57a04eaadeb3d&Tim=1593745100668&channelid=00&msisdn=c2ed52e5b1dd4e7cbfcc0e71e5ccc5cd&CI=638806013572600908000003955341&F=000009',

  'http://tyst.migu.cn/public/product5th/product34/2019/06/2116/2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/60054702001.mp3?key=de5eb05b3db8ba40&Tim=1593745115402&channelid=00&msisdn=37f30f7cfb21489a8a9e84dc340f9d5b&CI=600547020012600902000006889050&F=000009',
  'http://tyst.migu.cn/public/product5th/product34/2019/06/1320/2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/60054701911.mp3?key=27d9f0ece334690e&Tim=1593745126200&channelid=00&msisdn=200a5fa4638a4eeb9702cad8afbe6389&CI=600547019112600902000006889414&F=000009',
  'http://tyst.migu.cn/public/product5th/product34/2019/06/1119/2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/60054701964.mp3?key=abad501b8f1e8910&Tim=1593745145777&channelid=00&msisdn=b2867518858f46b1aada8bf0a7f564de&CI=600547019642600902000006889198&F=000009',

  'http://tyst.migu.cn/public/product5th/product35/2019/10/1616/2011%E5%B9%B408%E6%9C%8810%E6%97%A500011%E6%89%B9%E6%AC%A1/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_40_16_Stero/60084600029.mp3?key=fa5d2185b0b00587&Tim=1593745167251&channelid=00&msisdn=3156934fea4443d0892d61f5a58df60e&CI=600846000292600902000009222909&F=000009'

]


const lyric = [
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=60054701997',
  '',
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=63261202497',
  '',
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=63267001524',
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=63880601357',
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=60054702001',
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=60054701911',
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=60054701921',
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=60054701964',
  'http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=60084600029',

]
  