<template lang="pug">
  .block_white 
    .container 
      h2.heading.heading_orange Мы снизили цены! 
      h2.heading.heading_orange Выбирайте самый доступный ДМС от Телемед Полис для всей семьи всего за {{price}} рублей в год!
      .price
        p.price__text 
          b Годовой доступ 
          | к бесплатным консультациям врачей для Вас и Ваших близких в приложении "Доктор Рядом" - за 
          span.text_orange 
            b {{price}} 
          | рублей!
        //- p.price__text При заказе двух и более полисов цена за второй и последующие - 
        //-   span.text_green 
        //-     b 1800 
        //-   | рублей.
      h3.heading.heading_green Телемед Полис - ключ к Вашему здоровью!
</template>

<script>
export default {
  name: 'Price',
  props: {
    price: Number
  },
}
</script>

<style lang="scss">
.price{
  @media screen and (min-width: $tablets) {
    margin: 35px 0;
  }
  &__text{
    @media screen and (min-width: $tablets) {
      font-size: 24px;
    }
  }
}
</style>