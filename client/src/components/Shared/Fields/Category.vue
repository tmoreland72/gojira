<template>
   <q-select
      fill-input
      filled
      @filter="handleFilterCategories"
      hide-selected
      input-debounce="0"
      @input-value="setCategory"
      label="Category"
      :options="options"
      style="width: 320px; max-width: 95%;"
      use-input
      :value="formData"
   />

</template>

<script>
export default {
   props: ['formData', 'handleFilterCategories', 'options', 'setCategory']
}
</script>

<style scoped>

</style>
