<template>

</template>

<script>
import { copyToClipboard, Notify } from 'quasar'

export default {
   methods: {
      mxCopyValue(value) {
         copyToClipboard(value)
            .then(() => {
               Notify.create("Copied!")
            })
      },
   }
}
</script>

<style scoped>

</style>
