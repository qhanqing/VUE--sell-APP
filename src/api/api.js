import data from '../../data'

let Api = {
  getSeller () {
    return data.seller
  },
  getGoods () {
    return data.goods
  },
  getRatings () {
    return data.ratings
  }
}
export default Api
