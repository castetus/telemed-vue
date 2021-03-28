import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuelidate from 'vuelidate'
// import 'swiper/swiper-bundle.css'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Vuelidate)

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')