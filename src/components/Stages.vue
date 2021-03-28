<template lang="pug">
  .block_white#stages
    .container 
      h2.heading.heading_green этапы получения доступа
      .stages.swiper-container
        .slider-button-next.stages__nav#stages-next
        .slider-button-prev.stages__nav#stages-prev
        .stages__captions 
          .stages__caption(v-for="(caption, index) in captions" :key="caption.id" :class="slideClassList(caption.id)" @click="changeSlide(caption.id)")
            .stages__caption-content 
              span.stages__caption-number {{caption.id}} 
              br
              | {{caption.title}}
        .swiper-wrapper
          .stages__item.swiper-slide.stages__item_active(v-for="(item, index) in items" :key="item.id")
            .stages__item-wrapper
              h3.stages__title {{item.title}}
              p.stages__text {{item.text}}
              a.btn.btn_green.stages__button(href="#big-form") заказать полис
            img.stages__img(:src="path(item.id)", alt="")
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Stages',
  data() {
    return {
      stagesSlider: null,
      slideIndex: 0,
      captions: [
        {
          id: 1,
          title: 'купить полис'
        },
        {
          id: 2,
          title: 'пройти регистрацию'
        },
        {
          id: 3,
          title: 'получать консультации'
        },
      ],
      items: [
        {
          id: 1,
          title: 'доступ оформляется онлайн за 5 минут',
          text:  'Полис придет на вашу электронную почту. Он начнет действовать в течение 3 суток с момента покупки и будет активен 12 месяцев.'
        },
        {
          id: 2,
          title: 'регистрация на сайте или в приложении доктор рядом',
          text:  'Пройдите регистрацию на сайте или в приложении «Доктор рядом Телемед». При регистрации необходимо указать данные человека, на которого будет оформлен полис.'
        },
        {
          id: 3,
          title: 'в любое время — нужен только телефон или доступ в интернет',
          text:  'Полис дает возможность получить неограниченное количество консультаций в любое время. Прочитать, как проводится консультации, можно в разделе Частые вопросы'
        },
      ]
    }
  },
  mounted() {
    // eslint-disable-next-line
    this.stagesSlider = new Swiper('.stages', {
      navigation: {
            nextEl: '#stages-next',
            prevEl: '#stages-prev',
          },
    })
  },
  computed: {
    activeSlideNumber() {
      if (this.stagesSlider){
        return this.stagesSlider.activeIndex
      }
      return 0
    }
  },
  methods: {
    path(id) {
      return require(`../assets/img/stages_${id}.png`)
    },
    changeSlide(id){
      this.stagesSlider.slideTo(id - 1)
    },
    slideClassList(id){
      if (id === this.activeSlideNumber + 1){
        return `stages__caption_${id} stages__caption_${id}_active`
      }
      return `stages__caption_${id}`
    },
  }
}
</script>

<style lang="scss">
.stages {
  margin-bottom: -40px;
  &__captions {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  }
  &__caption {
    cursor: pointer;
    height: 80px;
    width: 90%;
    color: $color-orange;
    display: none;
    &_1 {
      background: url("~@/assets/img/caption_1.svg") center no-repeat;
      background-size: contain;
      @media screen and (min-width: $desktop) {
        margin-right: -31px;
      }
      &_active {
        background: url("~@/assets/img/caption_1_1.svg") center no-repeat;
        color: #fff;
        background-size: contain;
        display: block;
      }
    }
    &_2 {
      background: url("~@/assets/img/caption_2.svg") center no-repeat;
      background-size: contain;
      &_active {
        background: url("~@/assets/img/caption_2_1.svg") center no-repeat;
        color: #fff;
        background-size: contain;
        display: block;
      }
    }
    &_3 {
      background: url("~@/assets/img/caption_3.svg") center no-repeat;
      background-size: contain;
      @media screen and (min-width: $desktop) {
        margin-left: -47px;
      }

      &_active {
        background: url("~@/assets/img/caption_3_1.svg") center no-repeat;
        color: #fff;
        background-size: contain;
        display: block;
      }
    }
    @media screen and (min-width: $desktop) {
      display: block;
      height: 112px;
      width: 36%;
    }
  }
  &__caption-content {
    font-size: 14px;
    text-align: center;
    font-weight: 700;
    width: 100%;
    margin: 6px auto;
    text-transform: uppercase;
    @media screen and (min-width: $desktop) {
      font-size: 18px;
      margin: 20px auto;
    }
  }
  &__caption-number {
    font-size: 36px;
  }
  &__item {
    display: block;
    @media screen and (min-width: $desktop) {
      display: flex;
    }
  }
  &__item-wrapper {
    max-width: 80%;
    margin: 0 auto;
    @media screen and (min-width: $desktop) {
      flex: 1 0 70%;
    }
  }
  &__title {
    text-align: left;
    font-weight: 700;
    color: $color-grey;
    font-size: 14px;
    @media screen and (min-width: $tablets) {
      font-size: 36px;
    }
  }
  &__text {
    text-align: left;
    color: $color-grey;
    font-size: 12px;
    @media screen and (min-width: $tablets) {
      font-size: 24px;
      margin-bottom: 45px;
    }
  }
  &__img {
    width: 143px;
    float: right;
    @media screen and (min-width: $desktop) {
      flex: 1 0 30%;
    }
  }
  &__nav {
    @media screen and (min-width: $desktop) {
      display: none;
    }
  }
}

</style>