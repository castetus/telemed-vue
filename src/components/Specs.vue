<template lang="pug">
  .block_pink#specs
    .container 
      h2.heading.heading_green доступные специалисты
      .specs.swiper-container
        .swiper-wrapper
          .specs__item.swiper-slide(v-for="(value, key) in specs" :key="key")
            img.specs__img(:src="path(key)", alt="")
            h3.specs__title {{value}}
            p.specs__text(v-if="key == 1") Ответ в течение 1,5 минут
            p.specs__text(v-else) Ответ в течение  нескольких часов или на следующий день
        .slider-button-next.specs__next
        .slider-button-prev.specs__prev
      a.btn.btn_centered.btn_orange.btn_popup(@click="popupOpen") заказать полис
</template>

<script>
import Swiper from 'swiper'
import {eventBus} from "../main.js"
export default {
  name: 'Specs',
  data() {
    return {
      specs: {1: 'терапевт/педиатр', 2: 'психолог', 3: 'аллерголог-иммунолог', 4: 'гастроэнтеролог', 5: 'гинеколог', 6: 'дерматолог', 7: 'кардиолог', 8: 'лор', 9: 'невролог', 10: 'ортопед', 11: 'травматолог', 12: 'уролог', 13: 'эндокринолог'},
      countSlides: 1,
      swiperOptions: {
        navigation: {
          nextEl: '.specs__next',
          prevEl: '.specs__prev',
        },
        slidesPerView: this.countSlides,
        spaceBetween: 30,
        loop: true
      }
    }
  },
  methods: {
    path(id) {
      return require(`../assets/img/specs_${id}.jpg`)
    },
    popupOpen() {
      eventBus.$emit('popupOpen', 'ContactForm')
    }
  },
  mounted() {
    let countSlides = 1
    let width = window.innerWidth
    if (width <= 575){
        countSlides = 1
    } else if (width > 575 && width <= 768){
        countSlides = 2
    } else {
        countSlides = 3
    }
    // eslint-disable-next-line
    const specsSlider = new Swiper('.specs', {
      navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
      },
      slidesPerView: countSlides,
      spaceBetween: 30,
      loop: true
    })
  }
}
</script>

<style lang="scss">
.specs{
  margin-bottom: 45px;
  width: 100%;
  &__item{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__img{

  }
  &__title{
    color: $color-grey;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 0;
  }
  &__text{
    color: $color-grey;
    font-size: 14px;
    margin: 0;
    width: 275px;
  }
}
</style>