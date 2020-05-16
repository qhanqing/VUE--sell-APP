import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
// 设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '商品',
      component: goods
    },
    {
      path: '/goods',
      name: '商品',
      component: goods
    },
    {
      path: '/ratings',
      name: '评论',
      component: ratings
    },
    {
      path: '/seller',
      name: '商家',
      component: seller
    }
  ]
})
