<template>
  <div id="app">
    <app-header></app-header>
    <app-menu></app-menu>
    <main-slider></main-slider>
    <app-footer></app-footer>
    <div class="mask" :class="{mask_visible: isMaskVisible}"></div>
  </div>
</template>

<script>

// import {eventBus} from './main'
// import {ru} from 'vuejs-datepicker/dist/locale'
import AppHeader from './components/Header'
import AppMenu from './components/Menu'
import MainSlider from './components/MainSlider'
import AppFooter from './components/Footer'
import { eventBus } from './main'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppMenu,
    MainSlider,
    AppFooter
  },
  data (){
    return {
      isMaskVisible: false
    }
  },
  mounted() {
    eventBus.$on('menuOpen', () => {
      this.isMaskVisible = true
    }),
    eventBus.$on('close', () => {
      this.isMaskVisible = false
    })
  }
}
</script>

<style lang="scss">
.mask{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 250;
  top: 0;
  visibility: hidden;
  transition: opacity 0.4s, visibility 0.4s; 
  opacity: 0;
  &_visible{
      visibility: visible;
      opacity: 0.5;
      transition: opacity 0.4s; 
  }
}
</style>
