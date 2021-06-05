<template>
  <div class="thank-you">
    <div class="thank-you__wrapper">
      <div class="resume-text">
        <h2 class="heading heading_2 heading_green">Спасибо за оформление полиса с "Телемед Полис"!</h2>
        <p>После оформления заявки на сайте Вам на почту придет счёт на оплату от страховой компании. После оплаты Вы получите чек и оригинал полиса, который нужно подписать и отправить первую страницу по адресу <a href="mailto:key@med-tele.ru">key@med-tele.ru</a> вместе со сканами (фото) первой страницы паспорта и страницы с пропиской.</p>
        <p>Эти документы нужны для получения доступа к приложению "Доктор Рядом".</p>
        <p>После оплаты доступ начинает действовать через 3 дня сроком на 12 месяцев</p>
      </div>
    </div>
    <div class="thank-you__mask" @click="closePopup"></div>
  </div>
</template>

<script>
import {eventBus} from '../main'
export default {
  name: 'ThankYou',
  methods: {
    closePopup() {
      eventBus.$emit('close')
    }
  }
}
</script>

<style>
  .thank-you{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 30;
  }
  .thank-you__wrapper{
    background-color: #fff;
    position: absolute;
    width: 90%;
    max-width: 590px;
    top: 10%;
    left: calc(50vw - 295px);
    z-index: 100;
    padding: 0 20px 20px;
  }
  .thank-you__mask{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }
  .thank-you__close-button{
    background: url('../assets/close.svg') center no-repeat;
    background-size: contain;
    width: 20px;
    height: 20px;
    float: right;
    cursor: pointer;
    border: none;
    outline: none;
  }
</style>