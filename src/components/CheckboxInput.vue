<template>
  <div class="checkbox-input">
    <input type="checkbox" :name="inputName" v-model="value">
    <label :for="inputName">{{labelText}}</label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
  props: {
    inputName: {
      type: String,
      default: ''
    },
    labelText: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      value: false
    }
  },
}
</script>

<style>
  
</style>