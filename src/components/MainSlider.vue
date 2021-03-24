<template lang="pug">
  .slider 
    .container_full-width
      swiper.main-slider.swiper-container#main-slider(ref="swiper"
        direction="horizontal"
        :mousewheel-control="true"
        :performance-mode="false"
        :pagination-visible="true"
        :pagination-clickable="true")
        .swiper-wrapper
          .main-slider__slide.swiper-slide(v-for="slide in slides" :key="slide.id")
            picture.main-slider__picture
              source(:srcset="slide.pathBig" media="(min-width: 575px)")
              img.main-slider__img(:src="slide.pathSmall", alt="")
            .main-slider__mask
            .container.container_absolute
              .main-slider__text 
                p {{slide.text}}
                p Врач на связи круглосуточно!
              a.btn.btn_orange.main-slider__button.btn_popup(data-target="#popup-form") заказать полис
        .swiper-pagination
        .slider-button-prev.main-slider__prev
        .slider-button-next.main-slider__next
    a.btn.btn_centered.btn_orange.main-slider__bottom-btn.btn_popup(data-target="#popup-form") заказать полис
</template>

<script>
export default {
  name: 'mainSlider',
  data() {
    return {
      slides: [
        {
          id: 1,
          pathBig: '~@/assets/img/banner_1.jpg',
          pathSmall: '~@/assets/img/banner_1_s.jpg',
          text: 'Заболел ребенок или другой член семьи?',
        }
      ]
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
      display: none;
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