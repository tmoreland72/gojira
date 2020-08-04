<template>
   <q-item class="bg-grey-3">
      <q-item-section>
         <div class="fit row items-center q-gutter-sm">
            <div class="col" style="text-align: center;">
               <q-btn
                  :color="sortFields.includes('id') ? 'primary' : 'grey-8'"
                  flat
                  label="ID"
                  no-caps
                  @click="handleSort('id')"
               />
            </div>
            <div class="col" style="text-align: center;">
               <q-btn
                  :color="sortFields.includes('name') ? 'primary' : 'grey-8'"
                  flat
                  label="Name"
                  no-caps
                  @click="handleSort('name')"
               />
            </div>
            <div class="col" style="text-align: center;">
               <q-btn
                  :color="sortFields.includes('status') ? 'primary' : 'grey-8'"
                  flat
                  label="Status"
                  no-caps
                  @click="handleSort('status')"
               />
            </div>
            <div class="col" style="text-align: center;">
               <q-btn
                  :color="sortFields.includes('created') ? 'primary' : 'grey-8'"
                  flat
                  label="Created"
                  no-caps
                  @click="handleSort('created')"
               />
            </div>
         </div>
      </q-item-section>
   </q-item>

</template>

<script>
export default {
   props: {
      sortFields: {
         type: Array,
      },
      handleSort: {
         type: Function,
      }
   }
}
</script>

<style scoped>

</style>
