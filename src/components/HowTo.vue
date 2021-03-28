<template lang="pug">
  .block_white#howto
    .container 
      h2.heading.heading_green как это работает
      .swiper-container.howto
        .swiper-wrapper 
            - for (var i = 1; i <= 6; i++)
              .howto__slide.swiper-slide
                picture.howto__picture
                  source(srcset="~@/assets/img/howto_s_" + i +".jpg" media="(max-width: 767px)")
                  source(srcset="~@/assets/img/howto_" + i +".jpg" media="(min-width: 768px)")
                  img.howto__img(src="~@/assets/img/howto_s_" + i +".jpg", alt="")
                if (i == 1)
                  .howto__links
                    a.howto__link.howto__link_appstore(href="https://apps.apple.com/us/app/%D0%B4%D0%BE%D0%BA%D1%82%D0%BE%D1%80-%D1%80%D1%8F%D0%B4%D0%BE%D0%BC-%D1%82%D0%B5%D0%BB%D0%B5%D0%BC%D0%B5%D0%B4/id1293844621" target="blank")
                    a.howto__link.howto__link_google(href="https://play.google.com/store/apps/details?id=ru.drclinics.telemed" target="blank")
                    a.howto__link.howto__link_doctor(href="https://telemed.drclinics.ru/" target="blank")
        .slider-button-prev.howto__prev
        .slider-button-next.howto__next
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'HowTo',
  mounted() {
    setTimeout(() => {
    // eslint-disable-next-line
    const howToSlider = new Swiper('.howto', {
      loop: true,
      navigation: {
        nextEl: '.howto__next',
        prevEl: '.howto__prev',
      },
    })
    }, 1000);
  }
}
</script>

<style lang="scss">
.howto {
  &__test {
    height: 400px;
  }
  &__slide {
    position: relative;
  }
  &__picture {
    position: relative;
  }
  &__img {
    width: 100%;
  }
  &__links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 50%;
    bottom: 0;
    width: 100%;
    position: absolute;
    @media screen and (min-width: $tablets) {
      flex-direction: row;
      height: 50px;
      bottom: 5%;
    }
  }
  &__link {
    min-height: 45px;
    &_appstore {
      background: url("~@/assets/img/apple.png") center no-repeat;
      background-size: contain;
      width: 134px;
    }
    &_google {
      background: url("~@/assets/img/google.png") center no-repeat;
      background-size: contain;
      width: 134px;
    }
    &_doctor {
      background: url("~@/assets/img/doctor.png") center no-repeat;
      background-size: contain;
      width: 134px;
    }
  }
}
</style>