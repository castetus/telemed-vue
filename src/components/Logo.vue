<template lang="pug">
  .logo 
    img.logo__img(src="~@/assets/img/logo.jpg")
    span.logo__title телемед полис
    span.logo__text ключ к вашему здоровью
</template>

<script>
export default {
  name: "Logo",
}
</script>

<style lang="scss">
.logo{
  margin-bottom: 5px;
  &__img{
    width: 96px;
    float: left;
  }
  &__title{
    display: block;
    text-transform: uppercase;
    color: $color-orange;
    font-family: Days;
    font-size: 23px;
    margin-top: 14px;
  }
  &__text{
    display: block;
    text-transform: uppercase;
    color: $color-green;
    font-size: 8px;
    white-space: nowrap;
    margin-top: 5px;
  }
}
</style>
