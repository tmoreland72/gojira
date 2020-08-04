<template>
   <!--Details Drawer-->
   <q-drawer
      bordered
      dark
      persistent
      side="right"
      :value="!!mxSelectedId"
   >
      <div class="q-mt-lg q-pa-xs column q-gutter-sm text-caption">
         <q-input
            v-for="field in Object.keys(mxSelectedItem)"
            :key="field"
            autogrow
            borderless
            input-class="text-body2"
            dark
            dense
            :label="field"
            readonly
            stack-label
            :value="mxSelectedItem[field]"
         />
      </div>
   </q-drawer>
</template>

<script>
export default {
   props: {
      mxSelectedId: {
         type: String,
         required: true
      },
      mxSelectedItem: {
         type: Object,
         required: true,
      }
   },
}
</script>

<style scoped>

</style>
