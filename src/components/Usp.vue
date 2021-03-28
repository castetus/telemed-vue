<template lang="pug">
  .block_white#usp
    .container 
        h2.heading.heading_orange преимущества доступа
        .usp.swiper-container 
          .swiper-wrapper 
            .usp__item.swiper-slide
              img.usp__icon(src="~@/assets/img/icons/usp_1.svg")
              h3.usp__title ТРИ ВАРИАНТа СВЯзИ
              p.usp__text Консультации можно провести в чате, по телефону или видеосвязи
            .usp__item.swiper-slide
              img.usp__icon(src="~@/assets/img/icons/usp_2.svg")
              h3.usp__title 
                | разовый
                br
                | платеж
              p.usp__text Количество обращений не ограничено
            .usp__item.swiper-slide
              img.usp__icon(src="~@/assets/img/icons/usp_3.svg")
              h3.usp__title В ЛЮБОЕ ВРЕМЯ НА СВЯЗИ
              p.usp__text Дежурные врачи на связи круглосуточно
            .usp__item.swiper-slide
              img.usp__icon(src="~@/assets/img/icons/usp_4.svg")
              h3.usp__title ВРАЧИ ВСЕХ СПЕЦИАЛЬНОСТЕЙ
              p.usp__text 10 педиатров и 30 взрослых специалистов
          .slider-button-next.usp__next
          .slider-button-prev.usp__prev
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Usp',
  mounted() {
    let countSlides = 1
    let width = window.innerWidth
    if (width <= 575){
        countSlides = 1
    } else if (width > 575 && width <= 768){
        countSlides = 2
    } else if (width > 768 && width < 1024){
        countSlides = 3
    } else {
        countSlides = 4
    }
    // eslint-disable-next-line
    const uspSlider = new Swiper('.usp', {
      loop: true,
      navigation: {
        nextEl: '.usp__next',
        prevEl: '.usp__prev',
      },
      slidesPerView: countSlides,
      spaceBetween: 30,
    })
  }
}
</script>

<style lang="scss">
  .usp{
  display: flex;
  &__item{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__icon{
    max-height: 120px;
  }
  &__title{
    width: 185px;
    margin: 30px 0 7px 0;
    text-align: center;
    text-transform: uppercase;
    color: $color-grey;
    font-size: 18px;
    font-weight: 700;
  }
  &__text{
    text-align: center;
    color: $color-grey;
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }
}
</style>