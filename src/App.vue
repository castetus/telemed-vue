<template>
  <div id="app">
    <app-header></app-header>
    <app-menu></app-menu>
    <main-slider></main-slider>
    <price></price>
    <opps></opps>
    <usp></usp>
    <div class="block_pink">
      <div class="container">
        <contact-form></contact-form>
      </div>
    </div>
    <stages></stages>
    <specs></specs>
    <how-to></how-to>
    <div class="block_pink" id="big-form">
      <div class="container">
        <h2 class="heading heading_green">форма заявки</h2>
        <div class="big-form__wrapper">

        </div>
      </div>
    </div>
    <faq></faq>
    <app-footer></app-footer>
    <div class="popup" :class="{popup_visible : isPopupVisible}">
      <button class="btn btn_close" @click="popupClose"></button>
      <component :is="component"></component>
    </div>
    <div class="mask" :class="{mask_visible: isMaskVisible}" @click="close"></div>
    <div class="scroller" id="scroller" :class="{scroller_visible: isScrollerVisible}" @click="scroll"></div>
  </div>
</template>

<script>

import AppHeader from './components/Header'
import AppMenu from './components/Menu'
import MainSlider from './components/MainSlider'
import Price from './components/Price'
import Opps from './components/Opps'
import Usp from './components/Usp'
import ContactForm from './components/ContactForm'
import Stages from './components/Stages'
import Specs from './components/Specs'
import HowTo from './components/HowTo'
import Faq from './components/Faq'
import AppFooter from './components/Footer'
import ThankYou from './components/ThankYou'
import Licence from './components/Licence'
// import Policy from './components/Policy'
import { eventBus } from './main'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppMenu,
    MainSlider,
    Price,
    Opps,
    Usp,
    ContactForm,
    Stages,
    Specs,
    HowTo,
    Faq,
    AppFooter,
    ThankYou,
    Licence,
    // Policy
  },
  data (){
    return {
      isMaskVisible: false,
      isScrollerVisible: false,
      isPopupVisible: false,
      component: 'ContactForm'
    }
  },
  created() {
    window.addEventListener('scroll', () => {
      let scrollSize = window.pageYOffset
      if (scrollSize > 100){
        this.isScrollerVisible = true
      } else {
        this.isScrollerVisible = false
      }
    })
  },
  mounted() {
    eventBus.$on('menuOpen', () => {
      this.isMaskVisible = true
    }),
    eventBus.$on('close', () => {
      this.isMaskVisible = false
      this.popupClose()
    }),
    eventBus.$on('popupOpen', (elem) => {
      this.isPopupVisible = true
      this.isMaskVisible = true
      this.component = elem
    })
  },
  methods: {
    close() {
      eventBus.$emit('close')
    },
    popupClose() {
      this.isPopupVisible = false
      this.isMaskVisible = false
    },
    scroll() {
            const step = window.pageYOffset / 20,
              animationTime = 400,
              framesCount = 20;
          let scroll = setInterval(() => {
          window.scrollBy(0, -step)
              if (window.pageYOffset < 1){
                  clearInterval(scroll)
              }
          }, animationTime / framesCount);
    }
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
.slider-button-next,
.slider-button-prev {
  width: 14px;
  height: 31px;
  position: absolute;
  top: calc(50% - 15px);
  z-index: 1000;
  outline: none;
  cursor: pointer;
}
.slider-button-next {
  background: url("~@/assets/img/icons/arrow_right.svg") center no-repeat;
  background-size: contain;
  right: 0px;
}
.slider-button-prev {
  background: url("~@/assets/img/icons/arrow_left.svg") center no-repeat;
  background-size: contain;
  left: 0px;
}
.bullet {
  position: relative;
  background-color: #fff;
  opacity: 1;
  border-radius: 50%;
  width: 13px;
  height: 13px;
  display: inline-block;
  margin-right: 10px;
}
.bullet_active {
  &:before {
    content: "";
    position: absolute;
    top: -4px;
    left: -5px;
    background: transparent;
    border-radius: 50%;
    border: 1px solid #fff;
    width: 21px;
    height: 21px;
  }
}
.scroller {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s linear;
  z-index: 20;
  bottom: 30px;
  left: 30px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid $color-orange;
  cursor: pointer;
  &_visible {
    visibility: visible;
    opacity: 1;
    transition: all 0.4s linear;
  }
  &::before {
    content: "";
    position: absolute;
    background: url("~@/assets/img/icons/up-orange.svg") center no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
    bottom: 8px;
    left: 4px;
    @media screen and (min-width: $tablets) {
      height: 30px;
      width: 30px;
      left: 5px;
      bottom: 10px;
    }
  }
  &::after {
    content: "";
    position: absolute;
    background: url("~@/assets/img/icons/up-green.svg") center no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 1px;
    @media screen and (min-width: $tablets) {
      height: 30px;
      width: 30px;
      left: 5px;
      bottom: 1px;
    }
  }
  @media screen and (min-width: $tablets) {
    bottom: 50px;
    left: 50px;
    height: 40px;
    width: 40px;
  }
}
.popup{
  display: none;
  position: fixed;
  width: 590px;
  max-width: 90%;
  left: 5%;
  top: 10%;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 500;
  &_visible{
    display: block;
  }
  &_wide{
    width: 90vw;
    height: 90vh;
    left: 5%!important;
    top: 5%;
  }
  @media screen and(min-width: 650px) {
    left: calc(50vw - 295px);
  }
} 
.block{
  &_white{
    padding: 40px 0;
  }
  &_pink{
    background-color: $color-pink;
    padding: 21px 0;
  }
}
</style>
