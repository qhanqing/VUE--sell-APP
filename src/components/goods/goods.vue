<template>
  <div class="goods">
    <!--左侧列表-->
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{current :currentIndex===index}"
            @click="selectMenu(index)">
          <span class="text border-1px">
            <img v-show="item.type>0" :src="imgSupports(item.type)" class="icon" width="14px" height="14px">
            <span>{{item.name}}</span>
            </span>
        </li>
      </ul>
    </div>
    <!--右侧列表-->
    <div class="foods-wrapper">
      <ul ref="ulParent">
        <li v-for="(item,index) in goods" :key="index" class="food-List">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFoodClick(food)" v-for="food in item.foods" :key="food.name" class="food-item">
              <div class="icon">
                <img :src="food.icon" height="57px" width="57px">
              </div>
              <div class="content">
                <h2 class="name">
                  {{food.name}}
                </h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartButton :food="food"></cartButton>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--购物车-->
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods"></shopcart>
    <!-- 商品点击的详情页面遮罩 -->
    <transition name="foodStran">
      <food :food="selectedFoods" ref="food"></food>
    </transition>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import shopcart from '../shopcart/shopcart'
import food from '../food/food'
import cartButton from '../cartcontrol/cartButton'

export default {
  name: 'goods',
  components: {shopcart, cartButton, food},
  created () {
    this.goods = this.$store.getters.getGoods
    this.seller = this.$store.getters.getSeller
    this.$nextTick(() => {
      this.initScroll()
      this.calculateHeinght()
    })
  },
  computed: {
    // 控制左侧菜单随右侧滚动而滚动
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = 0
        let height2 = 0
        if (i === 0) {
          height2 = this.listHeight[i]
        } else {
          height1 = this.listHeight[i - 1]
          height2 = this.listHeight[i]
        }
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    // 计算被选中的元素 传入购物车组件中
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    // 显示照片
    imgSupports (obj) {
      let value = ''
      switch (obj) {
        case 0:
          value = require('../img/decrease_1@2x.png')
          break
        case 1:
          value = require('../img/invoice_1@2x.png')
          break
        case 2:
          value = require('../img/guarantee_1@2x.png')
          break
        case 3:
        case 4:
          value = require('../img/special_1@2x.png')
          break
      }
      return value
    },
    // 控制内容滚动
    initScroll () {
      let menuWrapper = document.querySelector('.menu-wrapper')
      let foodsWrapper = document.querySelector('.foods-wrapper')
      // eslint-disable-next-line no-unused-vars
      let menuscroll = new BScroll(menuWrapper, {click: true})
      // eslint-disable-next-line no-unused-vars
      this.foodsscroll = new BScroll(foodsWrapper, {
        click: true, probeType: 3
      })
      this.foodsscroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 让菜单栏跟着显示的内容滚动而滚动
    calculateHeinght () {
      let foodList = this.$refs.ulParent.getElementsByClassName('food-List')
      let height = 0
      Array.prototype.slice.call(foodList).forEach(li => {
        // 获取每个li的高度，并追加到数组中
        height += li.clientHeight
        this.listHeight.push(height)
      })
      /*   for (let i = 0; i < foodList.length; i++) {
           let item = foodList[i]
           height += item.clientHeight
           this.listHeight.push(height)
         } */
    },
    // 点击菜单让内容随菜单的点击而滚动
    selectMenu (index) {
      let foodList = this.$refs.ulParent.getElementsByClassName('food-List')
      // eslint-disable-next-line no-unused-vars
      let el = foodList[index]
      this.foodsscroll.scrollToElement(el, 300)
    },
    // 选中一个商品信息
    selectFoodClick (food) {
      this.selectedFoods = food
      // eslint-disable-next-line no-unused-expressions
      // 每次进入商品详情都刷新组件
      this.$refs.food.show()
    }
  },
  data () {
    return {
      goods: [], // 商品信息
      listHeight: [], // 展示的商品总共多高
      scrollY: 0, // 滚动的距离
      seller: {}, // 商家信息
      selectedFoods: {} // 选中的商品信息
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .goods {
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden

    .menu-wrapper {
      flex 0 0 80px
      width 80px
      background #f3f5f7

      .menu-item {
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px

        .icon {
          display inline-block
          vertical-align top
          background-size 12px 12px
          background-repeat no-repeat
        }

        .text {
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          text-align center
          border-1px(rgba(7, 17, 27, 0.1))
        }
      }

      .current {
        position relative
        margin-top -1px
        z-index 10
        background #ffffff
        font-weight 700

        .text {
          border none
        }
      }
    }

    .foods-wrapper {
      flex 1

      .title {
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      }

      .food-item {
        display flex
        margin 18px
        padding-bottom 18px
        border-bottom (rgba(7, 17, 27, 0.1)) solid 1px

        .icon {
          flex 0 0 57px
          margin-right 10px
        }

        .content {
          flex 1
          position relative

          .name {
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          }

          .desc {
            margin-bottom 8px
            font-size 10px
            color rgb(147, 153, 159)
            line-height 12px
          }

          .extra {
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          }

          .count {
            margin-right 12px
          }

          .price {
            font-weight 700
            line-height 24px
          }

          .now {
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          }

          .old {
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
          }

          .cartControl-wrapper {
            position absolute
            right 0
            bottom -8px
          }
        }
      }
    }
  }
</style>
