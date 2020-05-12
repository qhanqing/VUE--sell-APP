<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <!--购物图片-->
            <div class="logo" :class="{highlightLog:totalCount>0}">
              <i class="iconfont icon-shopping">&#xe613;</i>
            </div>
            <!--显示数量-->
            <div class="num" v-if="totalCount>0">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{highlightPrice:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <!-- 购物按钮-->
        <div class="content-right" @click="pay()">
          <div class="pay" :class="PayClass">
            {{payDesc}}
          </div>
        </div>
        <!--购物车列表-->
        <transition name="fold">
          <div class="shopCart-list" v-if="listShow" @click="setStop($event)">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty()">清空</span>
            </div>
            <div class="list-content">
              <ul>
                <li class="food" v-for="(food,index) in selectFoods" :key="index">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartControl-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="fold=true" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartButton'
import BScroll from '@better-scroll/core'

export default {
  name: 'shopcart',
  props: ['deliveryPrice', 'minPrice', 'selectFoods'],
  components: {cartcontrol},
  computed: {
    // 计算购买的总金额
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 计算购买的数量
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 控制是否起送
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    /**
     * @return {string}
     * 支付的颜色
     */
    PayClass () {
      if (this.totalPrice < this.minPrice) {
        return 'notPay'
      } else {
        return 'enoughPay'
      }
    },
    // 控制购物车列表的显示隐藏
    listShow () {
      if (!this.totalCount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          let shopCart = document.querySelector('.list-content')
          if (!this.scroll) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.scroll = new BScroll(shopCart, {click: true})
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    // 控制点击列表不退出
    setStop (ev) {
      ev.cancelBubble = true
      this.fold = false
    },
    // 点击底部购物车时
    toggleList () {
      if (!this.totalCount) {
        /* eslint-disable */
        return
      }
      this.fold = !this.fold
    },
    // 清空
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    //去结算
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
    }
  },
  data () {
    return {
      fold: true
    }
  }
}
</script>

<style scoped lang="stylus">
  .shopcart {
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px

    .content {
      display flex
      background #141d27
      color rgba(255, 255, 255, 0.4)

      .content-left {
        flex 1
        font-size 0

        .logo-wrapper {
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27

          .logo {
            width 100%
            height 100%
            text-align center
            border-radius 50%
            background #2b343c

            .icon-shopping {
              line-height 44px
              font-size 24px
              color #80858a
            }
          }

          .highlightLog {
            background rgb(0, 160, 220)

            .icon-shopping {
              color #ffffff
            }
          }

          .num {
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background red
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0, 0.4)
          }
        }

        .price {
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255, 255, 255, 0 .1)
          font-size 16px
          font-weight 700
        }

        .highlightPrice {
          color #ffffff
        }

        .desc {
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
        }
      }

      .content-right {
        flex: 0 0 105px
        width 105px

        .pay {
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700

        }

        .notPay {
          background #2b333b
        }

        .enoughPay {
          background #00b43c
          color #ffffff
        }
      }
    }

    .shopCart-list {
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      transform translate3d(0, -100%, 0)

      .list-header {
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 21, 0.1)

        .title {
          float left
          font-size 14px
          color rgb(7, 17, 27)
        }

        .empty {
          float right
          font-size 12px
          color rgb(0, 160, 220)
        }
      }

      .list-content {
        padding 0 18px
        max-height 217px
        overflow hidden
        background #ffffff

        .food {
          position relative
          padding 12px 0
          box-sizing border-box
          border-top: 1px solid rgba(7, 17, 21, 0.1)

          .name {
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          }

          .price {
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color red
          }

          .cartControl-wrapper {
            position absolute
            right 0
            bottom 6px
          }
        }
      }
    }

    .fold-enter, .fold-leave-to {
      transform translate3d(0, 0, 0)
    }

    .fold-enter-active, .fold-leave-active {
      transition all linear .3s
    }
  }

  .list-mask {
    position fixed
    bottom 0
    left 0
    width 100%
    height 100%
    z-index 40
    opacity 1
    background rgba(7, 17, 27, 0.6)
    backdrop-filter blur(10px)
  }

  .shell-enter, .shell-leave-to {
    height 0
    opacity 0
  }

  .shell-enter-active, .shell-leave-active {
    transition all linear .1s
  }
</style>
