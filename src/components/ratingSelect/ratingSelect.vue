<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span class="block positive" @click="select(2)" :class="{active:selectType===2}">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0)" :class="{active:selectType===0}">
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" @click="select(1)" :class="{active:selectType===1}">
        {{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent()" :class="{on:onlyContent}">
      <i class="iconfont">&#xe69e;</i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
export default {
  name: 'ratingSelect',
  props: {
    // 要展示的信息
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    // 当前选中的标签
    selectType: {
      type: Number,
      default: 2
    },
    // 是否只看有内容的评价
    onlyContent: {
      type: Boolean,
      default: false
    },
    // 满意度
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    // 过滤 rateType =0 的内容
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    // 过滤 rateType =1 的内容
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type) {
      this.selectType = type
      this.$emit('selectRatingType', type)
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$emit('toggleContent', this.onlyContent)
    }
  }
}
</script>

<style scoped lang="stylus">
  .ratingSelect {
    .rating-type {
      padding 18px 0
      margin 0 18px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      font-size 0

      .block {
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        color rgb(77, 85, 93)
        font-size 12px
        line-height 16px

        &.active {
          color #ffffff
        }

        &.positive {
          background rgba(0, 160, 220, 0.2)

          &.active {
            background rgb(0, 160, 220)
          }
        }

        &.negative {
          background rgba(77, 85, 93, 0.2)

          &.active {
            background rgb(77, 85, 93)
          }
        }

        .count {
          margin-left 2px
          font-size 8px
        }
      }
    }

    .switch {
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153, 159)
      font-size 0

      &.on {

        i {
          color #00c850
        }
      }

      i {
        margin-right 4px
        vertical-align top
        font-size 20px
      }

      .text {
        vertical-align top
        font-size 12px
      }
    }
  }
</style>
