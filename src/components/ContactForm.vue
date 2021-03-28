<template lang="pug">
  .form
    h2.heading.heading_orange
    form.form(action="")
      .form__field-block(:class="{form__field_error: $v.name.$dirty && $v.name.$invalid}" @focus="reset")
        label.form__label(for="name") Ваше имя
        input.form__field_required.form__field.form__field_green(type="text" name="name" placeholder="Иванов Иван Иванович" v-model="name")
      .form__field-block(:class="{form__field_error: $v.phone.$dirty && $v.phone.$invalid}" @focus="reset")
        label.form__label(for="phone") Телефон для связи
        input.form__field_required.form__field.form__field_green(type="text" name="phone" placeholder="89********** или +79**********" v-model="phone")
      .form__field-block.form__field-block_check(:class="{form__field_error: $v.agreement.$dirty && $v.agreement.$invalid}" @focus="reset")
        input.form__field_required.form__checkbox(type="checkbox" name="agreement" v-model="agreement")
        label.form__label.form__check(for="checkbox")
          span Согласие на 
            a.link.link_underlined.btn_popup(href="" data-target="#policy") обработку персональных данных
      input.form__btn.btn.btn_green.btn_centered(type="submit" value="отправить" @click.prevent="sendForm") 
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import { sameAs } from 'vuelidate/lib/validators'
import { eventBus } from '../main'
const checkPhone = (value) => /^\+?\d{11,11}$/.test(value)
export default {
  name: 'ContactForm',
  data() {
    return {
      name: '',
      phone: '',
      agreement: false,
      url: window.location.origin + '/mailer.php'
    }
  },
  validations: {
    name: {required: required},
    phone: {required, checkPhone},
    agreement: {sameAs: sameAs( () => true )}
  },
  methods: {
    async sendForm() {
        this.$v.$touch()
        if (this.$v.$error){
          return
        }
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('phone', this.phone)
        try {
        const response = await fetch(this.url, {
          method: 'POST',
          body: formData
        })
        const result = await response.text()
        if (result === 'sent'){
          eventBus.$emit('popupOpen', 'ThankYou')
          setTimeout(() => {
            eventBus.$emit('close')
          }, 2000);
        } else {
          eventBus.$emit('popupOpen', 'error')
        }
      } catch (error) {
        console.log(error)
      }
    },
    reset() {
      this.$v.$reset()
    },
  }
}
</script>

<style lang="scss">
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  flex-wrap: wrap;
  &__field-block{
    width: 100%;
    min-width: 300px;
    &_check{
      @media screen and(min-width: $tablets){
        order: 4;
      }
    }
    @media screen and(min-width: $tablets){
      margin-right: 14px;
      flex: 1 0 33%;
      margin-bottom: 0;
    }
  }
  &__label{
    position: relative;
    font-weight: 700;
    font-size: 14px;
    color: $color-grey;
    &::after{
      content: '*';
      color: red;
      position: absolute;
      right: -10px;
    }
  }
  &__field{
    margin-top: 10px;
    outline: none;
    &_green{
      border: 3px solid $color-green;
      border-radius: 11px;
      padding: 14px 0px 15px 24px;
      margin-bottom: 16px;
      width: 100%;
      color: $color-grey;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 14px;
      &::-webkit-input-placeholder{
        color: $color-light-grey;
      }
      &::-moz-placeholder{
        color: $color-light-grey;
      }
    }
    &_error .form__field{
      border: 3px solid red;
      color: red;
      &::-webkit-input-placeholder{
        color: red;
      }
      &::-moz-placeholder{
        color: red;
      }
    }
    &_error .form__check{
      border: 3px solid red;
      border-radius: 5px;
    }
    @media screen and(min-width: $tablets){
      
    }
  }
  &__btn{
    margin-top: 14px!important;
  }
  &__check{
    color: $color-orange;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 10px;
    margin-bottom: 16px;
    padding: 5px;
    @media screen and(min-width: $tablets){
      order: 4;
      margin-top: 15px;
    }
  }
  @media screen and(min-width: $tablets) {
    flex-direction: row;
    align-items: center;
  }
}
</style>