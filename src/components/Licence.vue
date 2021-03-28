<template lang="pug">
  .swiper-container.licence 
    .swiper-wrapper 
      img.swiper-slide(src="../assets/img/licence1.jpg", alt="")
      img.swiper-slide(src="../assets/img/licence2.jpg", alt="")
    .slider-button-prev 
    .slider-button-next
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Licence',
  mounted() {
    setTimeout(() => {
      // eslint-disable-next-line
      const licenceSlider = new Swiper('.licence', {
        loop: true,
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
      })
    }, 1000);
  }
}
</script>

<style>

</style>