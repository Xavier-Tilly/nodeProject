import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import VueRouter from 'vue-router'
import VeLine from 'v-charts/lib/line.common'
import http from './http'
// import VueSocketio from 'vue-socket.io'
// import socketio from 'socket.io-client'

Vue.component(VeLine.name,VeLine)

// Vue.config.productionTip = false
// Vue.use(VueSocketio, socketio('http://localhost:8081'))

Vue.prototype.$http=http
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
