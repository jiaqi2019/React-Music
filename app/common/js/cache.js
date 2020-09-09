import storage from "good-storage"


const SEARCH_HISTORY_KEY = '__search__'
const SEARCH_MAX = '10'

function insertArrray(arr, val, compare, maxlen){
    let index = arr.findIndex(compare)
    if(index == 0) return 
    if(index > 0){
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxlen && arr.length > maxlen){
        arr.pop()
    }
}
function deleteFromArray(arr, compare){
    let index = arr.findIndex(compare)
    if(index > -1){
        arr.splice(index, 1)
    }
}

// 搜索历史
export function loadSearchHitory(){
    return storage.get(SEARCH_HISTORY_KEY, [])
}

export function saveSearchHitory(query){
    
    let arr = storage.get(SEARCH_HISTORY_KEY, [])
    insertArrray(arr, query, (item)=>item === query, SEARCH_MAX)
    storage.set(SEARCH_HISTORY_KEY, arr)
    return arr
}

export function deleteSearchHitory(query){
    let arr = loadSearchHitory()
    deleteFromArray(arr, (item)=>item===query)
    storage.set(SEARCH_HISTORY_KEY, arr)
    return arr
}

export function clearSearchHitory(){
    storage.remove(SEARCH_HISTORY_KEY)
    return [];
}



const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX = '100'

export function saveFavorite(arg){
    let arr = storage.get(FAVORITE_KEY, [])
    insertArrray(arr, arg, (item)=>item.id === arg.id, FAVORITE_MAX)
    storage.set(FAVORITE_KEY, arr)
    return arr
}

export function deleteFavorite(arg){
    let arr = storage.get(FAVORITE_KEY, [])
    deleteFromArray(arr, item=>arg.id === item.id)
    storage.set(FAVORITE_KEY, arr)
    return arr
}

export function loadFavorite(){
    return storage.get(FAVORITE_KEY, [])
}

export function clearFavorite(){
    storage.remove(FAVORITE_KEY)
    return []
}


const PLAY_HIS_KEY = '__play_history__'
const PLAY_HIS_MAX = '100'

export function savePlayHis(arg){
    let arr = storage.get(PLAY_HIS_KEY, [])
    insertArrray(arr, arg, (item)=>item.id === arg.id, PLAY_HIS_MAX)
    storage.set(PLAY_HIS_KEY, arr)
    return arr
}

export function deletePlayHis(arg){
    let arr = storage.get(PLAY_HIS_KEY, [])
    deleteFromArray(arr, item=>arg.id === item.id)
    storage.set(PLAY_HIS_KEY, arr)
    return arr
}

export function loadPlayHis(){
    return storage.get(PLAY_HIS_KEY, [])
}

export function clearPlayHis(){
    storage.remove(PLAY_HIS_KEY)
    return []
}


