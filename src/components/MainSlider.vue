<template lang="pug">
  .slider 
    .container_full-width
      .main-slider.swiper-container
        .swiper-wrapper
          .main-slider__slide.swiper-slide(v-for="slide in slides" :key="slide.id")
              picture.main-slider__picture
                source(:srcset="pathBig(slide.id)" media="(min-width: 575px)")
                img.main-slider__img(:src="pathSmall(slide.id)", alt="")
              .main-slider__mask
              .container.container_absolute
                .main-slider__text 
                  p {{slide.text}}
                  p Врач на связи круглосуточно!
                a.btn.btn_orange.main-slider__button.btn_popup(@click="popupOpen('ContactForm')") заказать полис
        .swiper-pagination(slot="pagination")
        .slider-button-prev.main-slider__prev
        .slider-button-next.main-slider__next
    a.btn.btn_centered.btn_orange.main-slider__bottom-btn.btn_popup(@click="popupOpen('ContactForm')") заказать полис
</template>

<script>
import Swiper from 'swiper'
import {eventBus} from "../main.js"
export default {
  name: 'mainSlider',
  data() {
    return {
      slides: [
        {
          id: 1,
          text: 'Требуется расшифровка анализов или второе врачебное мнение?',
        },
        {
          id: 2,
          text: 'Чувствуете себя плохо, но не хотите идти в поликлинику?',
        },
        {
          id: 3,
          text: 'Заболел ребенок или другой член семьи?',
        },
        {
          id: 4,
          text: 'Необходимо второе мнение специалиста по сложному вопросу?',
        }
      ],
    }
  },
  computed: {
    swiper() {
      return this.$refs.mainSlider.$swiper
    }
  },
  mounted() {
    // eslint-disable-next-line
    const mainSlider = new Swiper('.main-slider', {
      pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'bullet',
            bulletActiveClass: 'bullet_active'
          },
          navigation: {
            nextEl: '.main-slider__next',
            prevEl: '.main-slider__prev',
          },
          loop: true,
    })
  },
  methods: {
    pathBig(id){
      return require(`../assets/img/banner_${id}.jpg`)
    },
    pathSmall(id){
      return require(`../assets/img/banner_${id}_s.jpg`)
    },
    popupOpen(elem){
      eventBus.$emit('popupOpen', elem)
    }
  }
}
</script>

<style lang="scss">
.main-slider{
  margin-bottom: 16px;
  max-height: 460px;
  &__slide{
    position: relative;
  }
  &__picture{
    position: relative;
  }
  &__img{
    width: 100%;
  }
  &__text{
    position: absolute;
    top: 23px;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    // &_grey{
    //   @media screen and (min-width: $desktop){
    //     color: $color-grey;
    //   }
    // }
    @media screen and (min-width: $mobile) {
      top: 0;
      left: 43px;
      width: 50%;
      max-width: 465px;
      font-size: 32px;
    }
    @media screen and (min-width: $desktop){
      top: 86px;
    }
  }
  &__mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.4);
  }
  &__button{
    display: none;
    position: absolute;
    bottom: 81px;
    @media screen and (min-width: $desktop){
      left: 43px;
      display: block;
    }
  }
  &__bottom-btn{
    @media screen and (min-width: $desktop){
      display: none!important;
    }
  }
  &__prev{
    left: 13px!important;
  }
  &__next{
    right: 13px!important;
  }
}
</style>