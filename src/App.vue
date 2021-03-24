<template>
  <div id="app">
    <app-header></app-header>
    <app-footer></app-footer>
  </div>
</template>

<script>

import AppHeader from './components/Header'
import AppFooter from './components/Footer'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>

</style>
