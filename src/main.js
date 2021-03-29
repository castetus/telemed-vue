import Vue from 'vue'
import App from './App.vue'

import Vuelidate from 'vuelidate'
// import 'swiper/swiper-bundle.css'
import 'swiper/css/swiper.css'

Vue.use(Vuelidate)

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')