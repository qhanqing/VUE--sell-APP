let Api = {
  // 用于操作localStorage 存入
  saveToLocal (id, key, value) {
    let seller = window.localStorage.__seller__
    // 如果没有存储
    if (!seller) {
      seller = {}
      seller[id] = {}
    } else {
      seller = JSON.parse(seller)
      // 如果没有存储这个商家
      if (!seller[id]) {
        seller[id] = {}
      }
    }
    seller[id][key] = value
    window.localStorage.__seller__ = JSON.stringify(seller)
  },
  // 用于操作localStorage 取出
  loadGetLocal (id, key, def) {
    let seller = window.localStorage.__seller__
    // 如果没有存储
    if (!seller) {
      return def
    }
    seller = JSON.parse(seller)[id]
    // 如果没有Key
    if (!seller) {
      return def
    }
    let ret = seller[key]
    return ret || def
  }
}
export default Api
