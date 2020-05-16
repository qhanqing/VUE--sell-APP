<template>
  <div v-show="showFlag" class="food">
    <div class="food-contend">
      <!--头部图片-->
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hider()">
          <i class="iconfont arrow">&#xe609;</i>
        </div>
      </div>
      <!--中间内容-->
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}</span>
          <span class="rating">好评率{{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <!--商品加减 同加入购物车是一个div区域展示-->
        <div class="cartControl-wrpper">
          <cartControl :food="food"></cartControl>
        </div>
        <!--加入购物车按钮  用if判断展示按钮||加减-->
        <div class="buy" @click="addFirst()" v-show="!food.count || food.count===0">
          加入购物车
        </div>
      </div>
      <!--分界线-->
      <split v-show="food.info"></split>
      <!--商品信息-->
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <!--分界线-->
      <split></split>
      <!--商品评价-->
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingSelect @selectRatingType="getRatingType" @toggleContent="getToggleContent" :select-type="selectType"
                      :only-content="onlyContent" :desc="desc"
                      :ratings="food.ratings"></ratingSelect>
      </div>
      <!--评价列表-->
      <div class="rating-wrapper">
        <ul v-if="food.ratings && food.ratings.length">
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating ,index) in food.ratings" :key="index"
              class="rating-item">
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img class="avatar" width="12" height="12" :src="rating.avatar">
            </div>
            <div class="time">
              {{rating.rateTime|formatDate}}
            </div>
            <p class="text">
              <i class="iconfont praise" :class="{praiseOn:rating.rateType===0}">&#xe62e;</i>
              {{rating.text}}
            </p>
          </li>
        </ul>
        <div v-else class="no-rating">
          暂无评价
        </div>
      </div>
    </div>
  </div>
</template>
<!--商品详情-->
<script>
import BScroll from 'better-scroll'
import cartControl from '../cartcontrol/cartButton'
import Vue from 'vue'
import split from '../split/split'
import ratingSelect from '../ratingSelect/ratingSelect'
import {formatDateTime} from '../../common/js/date'
/* const POSITIVE = 0
const NEGATIVE = 1 */
const ALL = 2
export default {
  name: 'food',
  props: {
    food: {
      type: Object
    }
  },
  components: {cartControl, split, ratingSelect},
  filters: {
    formatDate (item) {
      let date = new Date(item)
      return formatDateTime(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    // 显示详情
    show () {
      this.showFlag = true
      // 初始化组件
      this.selectType = ALL
      this.onlyContent = false
      // 控制页面滚动
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(document.querySelector('.food'), {click: true})
        } else {
          this.scroll.refresh()
        }
      })
    },
    // 返回
    hider () {
      this.showFlag = false
    },
    // 加入购物车
    addFirst () {
      Vue.set(this.food, 'count', 1)
    },
    // 根据用户的选择更改列表
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    // 接收子组件返回的类型
    getRatingType (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 接收子组件返回的是否选择有内容的评价
    getToggleContent (type) {
      this.onlyContent = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL, // 控制选中的类型
      onlyContent: false, // 控制是否显示只看状态
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .food {
    position fixed
    top 0
    left 0
    bottom 48px
    z-index 30
    width 100%
    background #ffffff

    .food-contend {

      .image-header {
        position relative
        width 100%
        height 0
        padding-top 100%

        img {
          position absolute
          top 0
          left 0
          width 100%
          height 100%
        }

        .back {
          position absolute
          top 10px
          left 0
        }

        .arrow {
          display block
          padding 10px
          font-size 15px
          color #ffffff
        }
      }

      .content {
        padding 18px
        position relative

        .title {
          line-height 14px
          margin-bottom 8px
          font-size 14px
          font-weight 700
          color rgb(7, 17, 27)
        }

        .detail {
          margin-bottom 18px
          line-height 10px
          font-size 0
          height 10px

          .sell-count {
            font-size 10px
            color rgb(147, 153, 159)
            margin-right 12px
          }

          .rating {
            font-size 10px
            color rgb(147, 153, 159)
          }
        }

        .price {
          font-weight 700
          line-height 24px

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
        }

        .cartControl-wrpper {
          position absolute
          right 12px
          bottom 12px
        }

        .buy {
          position absolute
          right 18px
          bottom 18px
          z-index 10
          height 24px
          line-height 24px
          padding 0 12px
          box-sizing border-box
          border-radius 12px
          font-size 10px
          color #ffffff
          background rgb(0, 160, 220)
        }
      }

      .info {
        padding 18px

        .title {
          line-height 14px
          margin-bottom 6px
          font-size 14px
          color rgb(77, 85, 93)
          font-weight 700
        }

        .text {
          padding 0 8px
          font-size 12px
          line-height 24px
          color rgb(77, 85, 93)
        }
      }

      .rating {
        padding-top 18px

        .title {
          line-height 14px
          margin-left 18px
          font-size 14px
          color rgb(7, 17, 27)
        }
      }

      .rating-wrapper {
        padding 0 18px

        .rating-item {
          position relative
          padding 16px 0
          border-top: 1px solid rgba(7, 17, 27, 0.1)

          .user {
            position absolute
            right 0
            top 16px
            font-size 0
            line-height 12px

            .name {
              display inline-block
              margin-right 6px
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
            }

            .avatar {
              border-radius 50%
            }
          }

          .time {
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          }

          .text {
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)

            .praise {
              color #949aa0
              line-height 16px
              margin-right 4px
              font-size 12px
            }

            .praiseOn {
              color rgb(0, 160, 220)
            }
          }
        }

        .no-rating {
          padding 16px
          font-size 12px
          color rgb(147, 153, 159)
        }
      }
    }
  }
</style>
