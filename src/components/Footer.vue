<template lang="pug">
  footer.footer
    .container 
      .footer__wrapper
        img.footer__logo(src="~@/assets/img/logo.svg", alt="med-tele.ru")
        ul.footer__menu
          li.footer__menu-item 
            a.footer__menu-link.link.btn_popup(@click.prevent="open('Policy')") Политика конфиденциальности
          li.footer__menu-item 
            a.footer__menu-link.link(href="https://apps.apple.com/us/app/%D0%B4%D0%BE%D0%BA%D1%82%D0%BE%D1%80-%D1%80%D1%8F%D0%B4%D0%BE%D0%BC-%D1%82%D0%B5%D0%BB%D0%B5%D0%BC%D0%B5%D0%B4/id1293844621" target="_blank") Скачать приложение в App Store
          li.footer__menu-item 
            a.footer__menu-link.link(href="https://play.google.com/store/apps/details?id=ru.drclinics.telemed" target="_blank") Скачать приложение в Google Play
          li.footer__menu-item 
            a.footer__menu-link.link.btn_popup(@click.prevent="open('Licence')") Лицензия
        ul.footer__menu.footer__company-details 
          li.footer__menu-item Телемед Полис
          li.footer__menu-item ИНН: 745111087681
          li.footer__menu-item ОГРНИП: 321470400013490
          li.footer__menu-item г. Мурино, ул. Шувалова, д.13/10
        .footer__contacts-wrapper
          contacts
          span.footer__copyright (c) Телемед 2021
    .container
      span.footer__licence-text ООО "Медицинская компания Доктор рядом", г.Москва, пр. 1-й Нагатинский, д. 11
</template>

<script>
import Contacts from './Contacts'
import { eventBus } from '../main'
export default {
  name: 'AppFooter',
  components: {
    Contacts
  },
  methods: {
    open(elem){
      eventBus.$emit('popupOpen', elem)
    }
  }
}
</script>

<style lang="scss">
.footer{
  background-color: $color-pink;
  &__wrapper{
    width: 100%;
    padding: 28px 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: $tablets) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__logo{
    max-width: 233px;
  }
  &__menu{
    list-style-type: none;
    padding-left: 0px;
    align-self: start;
  }
  &__menu-item{
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 7px;
    color: $color-grey;
  }
  &__contacts-wrapper{
    height: 100%;
    font-size: 12px;
  }
  &__contacts-wrapper .contacts{
    font-size: 12px;
  }
  &__copyright{
    font-size: 12px;
    font-weight: 600;
    color: $color-green;
    float: right;
    margin-top: -10px;
  }
  &__licence-text{
    font-size: 8px;
  }
}
</style>