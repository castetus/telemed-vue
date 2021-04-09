import Vue from 'vue'
import App from './App.vue'

import Vuelidate from 'vuelidate'
import 'swiper/css/swiper.css'

// import VueYandexMetrika from 'vue-yandex-metrika'                               
 
// Vue.use(VueYandexMetrika, {
//     id: 75247153,
//     env: process.env.NODE_ENV
// })

Vue.use(Vuelidate)

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')