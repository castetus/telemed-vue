<template lang="pug">
  .policy   
    h2.heading.heading_2.heading_orange Политика обработки персональных данных
    iframe(height="100%" width="100%" :src="path")
</template>

<script>
export default {
  name: 'Policy',
  methods: {
    path() {
      return require("../assets/policy.pdf")
    }
  }
}
</script>

<style>

</style>