import originJSONP from 'jsonp'

export function jsonP(url, data, option){
    url += (url.indexOf('?') < 0 ? '?' : '&') + paramFormat(data)
    return new Promise((res, rej)=>{
        originJSONP(url, option, (err, data)=>{
            if(!err){
                res(data)
            }else{
                rej(err)
            }
        })
    })
}


function paramFormat(data){
    let url = '';
    for (const key in data) {
        let value = data[key] === undefined ? "" : data[key];
        url += `&${key}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : '';
}   