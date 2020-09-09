
export function addClass(el, className) {
    el.className += ` ${className}`
    // el.classList.add(className)
}

export function getDataset(el, attrName, val){
    if(val){
      el.dataset[attrName] = val  
    }else{
        return el.dataset[attrName]
    }
}