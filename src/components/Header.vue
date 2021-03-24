<template lang="pug">
  header 
    .container 
      .header 
        logo
        h2.heading_green.header__slogan Консультируйтесь с 
          br 
          | профессиональными врачами 24/7 
          br 
          | без ожидания и очередей!
        .header__cta 
          a.btn.btn_outlined.btn_centered.btn_popup(data-target="#popup-form") заказать полис
        contacts
        button.header__menu-button#dropdown
</template>

<script>
import Logo from './Logo'
import Contacts from './Contacts'
export default {
  name: 'Header',
  components: {
    Logo,
    Contacts
  }
}
</script>

<style>

</style>