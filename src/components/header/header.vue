<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"><img :src="flterSupports(2)" style="width: 100%;height: 100%"> </span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" @click="showDetail" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont">&#xe66f;</i>
      </div>
    </div>
    <!-- 公告-->
    <div class="bulletin-weapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont">&#xe66f;</i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 弹出层-->
    <transition name="fadeName">
      <div v-if="detailShow" class="detail" key="box1">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="150" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
                <img :src="flterSupports(item.type)" class="icon" width="16px" height="16px">
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="showDetail">
          <i class="iconfont">&#xe607;</i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'

export default {
  name: 'v-header',
  props: ['seller'],
  components: {star},
  created () {
  },
  filters: {},
  methods: {
    flterSupports (obj) {
      let value = ''
      switch (obj) {
        case 0:
          value = require('./img/decrease_1@2x.png')
          break
        case 1:
          value = require('./img/invoice_1@2x.png')
          break
        case 2:
          value = require('./img/guarantee_1@2x.png')
          break
        case 3:
        case 4:
          value = require('./img/special_1@2x.png')
          break
      }
      return value
    },
    showDetail () {
      this.detailShow = !this.detailShow
    }
  },
  data () {
    return {
      detailShow: false
    }
  }
}
</script>
<style scoped lang="less">
  .header {
    .fadeName-enter-active, .fadeName-leave-active {
      transition: opacity .5s
    }

    .fadeName-enter, .fadeName-leave-to {
      opacity: 0;
    }
  }
</style>
<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .header {
    color: #ffffff;
    position relative
    background rgba(7, 17, 27, 0.5)
    overflow hidden

    .content-wrapper {
      padding: 24px 12px 18px 24px;
      font-size: 0;
      position: relative;

      .avatar {
        display: inline-block;
        vertical-align top

        img {
          border-radius 2px
        }
      }

      .content {
        font-size: 14px;
        margin-left: 16px;
        display: inline-block;

        .title {
          margin: 2px 0 8px 0;

          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align top
            bg-image('./img/brand')
            background-size 30px 18px
            background-repeat no-repeat
          }

          .name {
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
          }
        }

        .description {
          margin-bottom 10px
          line-height: 12px
          font-size: 12px
        }

        .support {
          display flex

          .icon {
            display inline-block
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
          }

          .text {
            font-size: 12px
          }
        }
      }

      .support-count {
        position: absolute;
        right 12px;
        bottom 14px;
        padding 0 8px;
        height 24px;
        line-height 24px;
        border-radius 14px;
        background-color rgba(0, 0, 0, 0.2)
        text-align center;

        .count {
          font-size 10px
        }

        i {
          margin-left 2px;
          line-height 24px;
          font-size 6px
        }
      }
    }

    .bulletin-weapper {
      position: relative;
      height 28px;
      line-height 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background rgba(7, 17, 27, 0.2)

      .bulletin-title {
        display inline-block;
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image("./img/bulletin")
        background-size 22px 12px
        background-repeat no-repeat
      }

      .bulletin-text {
        vertical-align top
        margin 0 4px
        font-size 10px
      }

      i {
        font-size 10px
        position: absolute;
        right 12px;
      }
    }

    .background {
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1;
      filter blur(10px)
    }

    .detail {
      position: fixed
      top 0
      left 0
      z-index 100
      width 100%
      overflow auto
      height 100%
      background rgba(7, 17, 27, 0.8)

      .detail-wrapper {
        min-height 100%
        width 100%

        .detail-main {
          margin-top 64px
          padding-bottom 64px

          .name {
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          }

          .star-wrapper {
            margin-top 18px
            padding 2px 0
            display: flex;
            justify-content: center;
          }

          .title {
            display flex
            width 80%
            margin 28px auto 24px auto

            .line {
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            }

            .text {
              padding 0 12px
              font-weight 700px
              font-size 14px
            }
          }

          .supports {
            width 80%
            margin 0 auto

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

            .supports-item {
              padding 0 12px
              margin-bottom 12px
              font-size 0
            }

            .text {
              line-height 16px
              font-size 12px
            }
          }
        }
      }

      .detail-close {
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
      }

    }

    .bulletin {
      width 80%
      margin 0 auto

      .content {
        padding 0 12px
        line-height 24px
        font-size 12px
      }
    }
  }
</style>
