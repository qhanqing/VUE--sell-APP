<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :imgWidth="17" :size="120" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :imgWidth="17" :size="120" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect @selectRatingType="getRatingType" @toggleContent="getToggleContent" :select-type="selectType"
                    :only-content="onlyContent" :ratings="ratings"></ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating ,index) in ratings" class="rating-item"
              :key="index">
            <div class="avatar">
              <img width="28px" height="28px" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :size="70" :imgWidth="12" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend&&rating.recommend.length">
                <i class="iconfont">&#xe62e;</i>
                <span v-for="(text,index) in rating.recommend" :key="index+'a'">{{text}}</span>
              </div>
              <div class="time">
                {{rating.rateTime|formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import ratingSelect from '../ratingSelect/ratingSelect'
import {formatDateTime} from '../../common/js/date'
import BScroll from 'better-scroll'

const ALL = 2
export default {
  name: 'ratings',
  components: {star, split, ratingSelect},
  filters: {
    formatDate (item) {
      let date = new Date(item)
      return formatDateTime(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {
    this.seller = this.$store.getters.getSeller
    this.ratings = this.$store.getters.getRatings
    this.$nextTick(() => {
      this.scroll = new BScroll(document.querySelector('.ratings'), {click: true})
    })
  },
  methods: {
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
    // 用户选择的类型
    getRatingType (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 是否展示只有内容的评价
    getToggleContent (type) {
      this.onlyContent = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  data () {
    return {
      seller: {},
      ratings: [],
      showFlag: false,
      selectType: ALL, // 控制选中的类型
      onlyContent: false // 控制是否显示只看内容
    }
  }
}
</script>

<style scoped lang="stylus">
  .ratings {
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden

    .overview {
      display flex
      padding 18px 0

      .overview-left {
        flex 0 0 137px
        padding 6px 0
        width 137px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center

        .score {
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255, 253, 0)
        }

        .title {
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
          margin-bottom 8px
        }

        .rank {
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        }
      }

      .overview-right {
        flex 1
        padding: 6px 0 6px 24px

        .score-wrapper {
          display flex
          justify-content: space-between;
          font-size 0

          .title {
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
            vertical-align top
          }

          .star {
            line-height 18px
            vertical-align top
          }

          .score {
            line-height 18px
            font-size 12px
            color rgb(255, 153, 0)
            vertical-align top
            padding-right 10px
          }
        }

        .delivery-wrapper {
          font-size 0

          .title {
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          }

          .delivery {
            margin-left: 12px
            font-size 12px
            color rgb(147, 153, 159)
          }
        }
      }
    }

    .rating-wrapper {
      padding 0 18px

      .rating-item {
        display flex
        padding 18px 0
        border-top: 1px solid rgba(7, 17, 27, 0.1)

        .avatar {
          flex 0 0 28px
          width 28px
          margin-right 12px

          img {
            border-radius 50%
          }
        }

        .content {
          flex 1
          position relative

          .name {
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          }

          .star-wrapper {
            font-size 0
            margin-bottom 6px
            display flex

            .star {
              margin-right 6px
              vertical-align top
            }

            .delivery {
              vertical-align top
              display inline-block
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
            }
          }

          .text {
            margin-bottom 8px
            line-height 18px
            color rgb(7, 17, 27)
            font-size 12px
          }

          .recommend {
            line-height 16px
            font-size 0

            i {
              display inline-block
              font-size 9px
              margin 0 8px 4px 0
              color rgb(0, 160, 220)
            }

            span {
              display inline-block
              font-size 9px
              margin 0 8px 4px 0
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              color rgb(147, 153, 159)
              background #ffffff
            }
          }

          .time {
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          }
        }
      }
    }
  }
</style>
