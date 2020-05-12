<template>
  <div class="cartButton">
    <transition class="cart-decrease" name="move">
      <span class="inner" v-if="food.count>0" @click.stop.prevent="decreaseCart()">
         <i class="iconfont">&#xe61f;</i>
      </span>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart()">
      <i class="iconfont">&#xe620;</i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'cartButtron',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    // 添加一个商品
    addCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    // 删除一个商品
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .cartButton {
    font-size 0

    .cart-decrease {
      display: inline-block

      .inner {
        padding: 6px
        font-size 24px
        line-height 24px
        color rgb(0, 160, 220)
      }
    }

    .move-enter-active, .move-leave-active {
      transition: opacity .5s;
    }

    .move-enter, .move-leave-to {
      transform: translateX(10px);
      opacity: 0;
    }

    .cart-count {
      display inline-block
      vertical-align top
      width 12px
      padding: 8px 6px 6px 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    }

    .cart-add {
      display inline-block
      font-size 24px
      line-height 24px
      padding: 6px
    }

    i {
      color rgb(0, 160, 220)
    }
  }
</style>
