export function shuffle(list){
    let ret = list.slice()
    for(let i = 0; i < list.length; i++){
        let random = getRandom(0, i);
        [ret[i], ret[random]] = [ret[random], ret[i]];
    }
    return ret
}

function getRandom(min, max){
    return min +(Math.random()*(max - min + 1) | 0)
}


export function debounce (func, delay) {
    let timer
  
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
}