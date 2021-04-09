<template lang="pug">
  .block_pink#opps
    .container 
      h2.heading.heading_orange Возможности ПРОГРАММЫ
      .opps
        .opps__slider.swiper-container
          .swiper-wrapper.opps__wrapper
            .opps__item.swiper-slide(v-for="item in items" :key="item.id" ref="slide")
                .opps__icon-wrapper
                  img.opps__icon(:src="path(item.id)") 
                p.opps__text {{item.text}}
          .slider-button-next.opps__nav-button.opps__nav-button-next
          .slider-button-prev.opps__nav-button.opps__nav-button-prev
      a.btn.btn_centered.btn_orange(href="#big-form" @click="showForm") заказать полис
</template>

<script>
import Swiper from 'swiper'
import { eventBus } from '../main'
export default {
  name: 'Opps',
  data() {
    return {
      items: [
        {
          id: 1,
          text: 'Получать срочные и плановые консультации врачей и перепроверки правильности диагноза, поставленного другими врачами'
        },
        {
          id: 2,
          text: 'Просматривать анкетные данные врачей, их рейтинг, отзывы и расписание'
        },
        {
          id: 3,
          text: 'Фотографировать собственные анализы, медицинскую карту и хранить фотографии в приложении'
        },
        {
          id: 4,
          text: 'Просматривать историю консультаций и рекомендации врачей'
        }
      ]
    }
  },
  mounted() {
    const width = window.innerWidth
    if (width >= 768){
      this.$refs.slide.forEach(elem => elem.classList.remove('swiper-slide'))
    }
      // eslint-disable-next-line
      const oppsSlider = new Swiper('.opps__slider', {
        navigation: {
          nextEl: '.opps__nav-button-next',
          prevEl: '.opps__nav-button-prev',
        },
        loop: true
      })
  },
  methods: {
    showForm(){
      eventBus.$emit('showForm')
    },
    path(id){
      return require(`../assets/img/icons/opps_${id}.svg`)
    }
  }
}
</script>

<style lang="scss">
.opps{
  position: relative;
  margin-bottom: 0 auto 16px;
  width: 100%;
  
  &__slider{
    max-width: 707px;
    margin: 0 auto;
  }
  &__wrapper{
    display: flex;
    @media screen and (min-width: $tablets){
      flex-direction: column;
    }
  }
  &__item{
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: $tablets) {
      margin-bottom: 41px;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }
  &__text{
    margin: 1em 8px;
    font-size: 14px;
    @media screen and (min-width: $tablets){
      font-size: 24px;
    }
  }
  &__icon-wrapper{
    display: flex;
    flex: 1 0 16%;
    justify-content: center;
  }
  &__nav-button{
    top: calc(50% - 35px)!important;
    @media screen and (min-width: $tablets){
      display: none;
    }
  }
}
</style>