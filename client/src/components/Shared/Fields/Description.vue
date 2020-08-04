<template>
   <q-input
      autogrow
      filled
      input-style="min-height: 160px;"
      label="Description"
      style="width: 95%;"
      v-model="formData.description"
   />
</template>

<script>
export default {
   props: ['formData']
}
</script>

<style scoped>

</style>
