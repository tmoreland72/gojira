<template>
   <q-select
      filled
      label="Status"
      style="width: 160px;"
      :options="options.status"
      v-model="formData.status"
   />
</template>

<script>
export default {
   props: ['formData', 'options']
}
</script>

<style scoped>

</style>
