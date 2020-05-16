<template>
  <div class="star" :style="starType">
    <div v-for="(item,index) in itemClassess" :key="index"
         class="star-item">
      <img :src="item" :style="imgType">
    </div>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    },
    imgWidth: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'width:' + this.size + 'px'
    },
    imgType () {
      if (this.imgWidth) {
        return 'width:' + this.imgWidth + 'px' + ';' + 'height:' + this.imgWidth + 'px'
      } else {
        return 'width: auto;height: auto;'
      }
    },
    itemClassess () {
      let result = []
      // eslint-disable-next-line no-unused-expressions
      let score = Math.floor(this.score * 2) / 2 /* 多少个星级 */
      let hasDecimal = score % 1 !== 0 /* 是否有半星 */
      let integer = Math.floor(score) /* 整星 */
      for (let i = 0; i < integer; i++) {
        result.push(this.imgItem.onImg)
      }
      if (hasDecimal) {
        result.push(this.imgItem.halfImg)
      }
      while (result.length < 5) {
        result.push(this.imgItem.offImg)
      }
      return result
    }
  },
  data () {
    return {
      imgItem: {
        onImg: require('./star24_on@2x.png'),
        halfImg: require('./star24_half@2x.png'),
        offImg: require('./star24_off@2x.png')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .star {
    font-size: 0;
    overflow: hidden;
    display: flex;

    .star-item {
      width: 100%;
      display: inline-block;
      background-repeat: no-repeat;

      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
      }
    }
  }
</style>
