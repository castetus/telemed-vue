<template>
  <div class="input-block select-input" :class="{'input-block_error': $v.value.$error }">
    <label :for="inputName">{{labelText}}</label>
    <select :name="inputName" 
      :value="value" 
      v-on:change="$emit('input', $event.target.value), reset">
      <option
        v-for="(option, key) in options"
        :key="key" 
        :value="option">
        {{option}}
      </option>
    </select>
    <div class="input-error" v-if="$v.value.$dirty && $v.value.$invalid">Выберите вариант из списка</div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { eventBus } from '../main'
export default {
  name: 'SelectInput',
    props: {
      inputName: {
        type: String,
        default: ''
      },
      labelText: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: null
      },
      value: {
        type: String,
        default: ''
      }
    },
    data(){
      return{
        val: null
      }
    },
    mounted() {
      eventBus.$on("proceed", this.validate)
    },
    beforeDestroy(){
      eventBus.$off("proceed", this.validate)
    },
    validations: {
      value: {required: required},
    },
    methods: {
      validate() {
        this.$v.$touch()
        if (this.$v.$error) {
          eventBus.$emit("validationError", this.$v.$error)
        }
      },
      reset() {
        this.$v.$reset()
        eventBus.$emit('validationError', this.$v.$error)
      }
    },
  }
</script>

<style>

</style>