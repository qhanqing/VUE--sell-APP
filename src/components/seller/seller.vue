<template>
  <div class="seller">
    <div class="seller-content">
      <!--描述-->
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="120" :imgWidth="16" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite()">
          <i class="iconfont" :class="{active:favorite}">&#xe621;</i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <!--分割线-->
      <split></split>
      <!-- 公告与活动-->
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
      <!--活动-->
      <ul v-if="seller.supports" class="supports">
        <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
          <img :src="_filterSupports(item.type)" class="icon" width="16px" height="16px">
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
      <!--分割线-->
      <split></split>
      <!--商家图片-->
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="phtoBS">
          <ul class="pic-list" v-if="seller.pics">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <!--分割线-->
      <split></split>
      <!--商家信息-->
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import BScroll from 'better-scroll'
import storeData from '../../common/js/store'
// 商家
export default {
  name: 'seller',
  components: {star, split},
  created () {
    this.seller = this.$store.getters.getSeller
  },
  ready () {
    this._initScroll()
    this._initPics()
  },
  watch: {
    seller () {
      this._initScroll()
      this._initPics()
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '收藏' : '未收藏'
    }
  },
  methods: {
    _initPics () {
      let _this = this
      if (_this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * _this.seller.pics.length - margin
        document.querySelector('.pic-list').style.width = width + 'px'
        _this.$nextTick(() => {
          if (!_this.picScroll) {
            _this.picScroll = new BScroll(_this.$refs.phtoBS, {
              click: true,
              scrollX: true
            })
          } else {
            _this.picScroll.refresh()
          }
        })
      }
    },
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(document.querySelector('.seller'), {click: true})
      } else {
        this.scroll.refresh()
      }
    },
    _filterSupports (obj) {
      let value = ''
      switch (obj) {
        case 0:
          value = require('../header/img/decrease_1@2x.png')
          break
        case 1:
          value = require('../header/img/invoice_1@2x.png')
          break
        case 2:
          value = require('../header/img/guarantee_1@2x.png')
          break
        case 3:
        case 4:
          value = require('../header/img/special_1@2x.png')
          break
      }
      return value
    },
    // 收藏
    toggleFavorite () {
      this.favorite = !this.favorite
      // 存入 localStorage 中
      storeData.saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  data () {
    return {
      seller: {},
      favorite: () => {
        return storeData.loadGetLocal(this.seller.id, 'favorite', false)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .seller {
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden

    .seller-content {
      .overview {
        padding 18px
        position relative

        .title {
          margin-bottom 8px
          line-height 14px
          color rgb(7, 17, 27)
          font-size 17px
          font-weight 700
        }

        .desc {
          padding-bottom 18px
          font-size 0
          display flex

          star {
            margin-right 8px
            vertical-align top
          }

          .text {
            margin-right 12px
            display inline-block
            vertical-align top
            font-size 10px
            color rgb(77, 80, 93)
          }
        }

        .remark {
          display flex
          padding-top 18px
          border-top: 1px solid rgba(7, 17, 27, 0.1)

          .block {
            flex 1
            text-align center
            border-right 1px solid rgba(7, 17, 27, 0.1)

            &:last-child {
              border none
            }
          }

          h2 {
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          }

          .content {
            line-height 24px
            font-size 10px
            color: rgb(7, 17, 27)

            .stress {
              font-size 24px
            }
          }

        }

        .favorite {
          position absolute
          width 50px
          right 11px
          top 18px
          text-align center

          i {
            display block
            margin-bottom 4px
            color #d4d6d9
            line-height 24px
            font-size 24px
          }

          .active {
            color rgb(240, 20, 20)
          }

          .text {
            font-size 10px
            line-height 10px
            color: rgb(77, 85, 93);
          }
        }
      }

      .bulletin {
        padding 18px 18px 0 18px

        .title {
          margin-bottom 8px
          line-height 14px
          color rgb(7, 17, 27)
          font-size 14px
          font-weight 700
        }

        .content-wrapper {
          padding 0 12px 16px 12px

          .content {
            line-height 24px
            font-size 12px
            color rgb(240, 20, 20)
          }
        }
      }

      .supports {
        .supports-item {
          padding 16px 0
          margin 0 12px
          box-sizing border-box
          font-size 0
          border-top: 1px solid rgba(7, 17, 27, 0.1)
        }

        .icon {
          width: "16px";
          height: "16px";
          display inline-block
          vertical-align top
          box-sizing border-box
          margin-right 6px
          background-size 16px
          background-repeat no-repeat
        }

        .text {
          line-height 16px
          font-size 12px
          color rgb(7, 17, 27)
        }
      }

      .pics {
        padding 18px

        .title {
          margin-bottom 12px
          line-height 14px
          color rgb(7, 17, 27)
          font-size 14px
          font-weight 700
        }

        .pic-wrapper {
          width 100%
          overflow hidden
          white-space nowrap

          .pic-list {
            font-size 0

            .pic-item {
              display inline-block
              margin-right 6px
              width 120px
              height 90px

              &:last-child {
                margin: 0
              }
            }
          }
        }
      }

      .info {
        padding 18px 18px 0 18px
        color rgb(7, 17, 27)

        .title {
          padding-bottom 12px
          line-height 14px
          font-size 14px
          font-weight 700
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        }

        .info-item {
          padding 16px 12px
          line-height 16px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          font-size 12px

          &:last-child {
            border none
          }
        }
      }
    }
  }
</style>
