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
   data() {
      return {
         mxSelectedId: "",
         mxSelectedItem: {},
      }
   },

   methods: {
      mxHandleClickItem(item) {
         if (this.mxSelectedId === item.id) {
            this.mxSelectedId = ""
            this.mxSelectedItem = {}
         } else {
            this.mxSelectedId = item.id

            let keys = Object.keys(item).sort()
            let res = {}
            keys.map(key => {
               res[key] = item[key]
            })
            this.mxSelectedItem = res
         }
      },

      mxResetSelected() {
         this.mxSelectedItem = {}
         this.mxSelectedId = ""
      },

   }
}
</script>

<style scoped>

</style>
