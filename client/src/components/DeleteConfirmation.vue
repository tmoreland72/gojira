<template>
   <q-dialog v-model="show">
      <q-card>
         <q-card-section>
            <span>{{message}}</span>
         </q-card-section>
         <q-card-actions>
            <div class="row justify-end q-gutter-md">
               <q-btn color="primary" flat label="Whoops! Cancel That!" @click="handleCancelDelete"/>
               <q-btn color="negative" label="i am sure" @click="handleDelete"/>
            </div>
         </q-card-actions>
      </q-card>
   </q-dialog>
</template>

<script>
export default {
   props: {
      show: {
         type: Boolean,
         default: false,
      },
      message: {
         type: String,
         default: "If you delete this item it is permanently gone.  Are you sure?"
      },
      handleDelete: {
         type: Function,
         required: true,
      },
      handleCancelDelete: {
         type: Function,
         required: true,
      }
   }
}
</script>

<style scoped>

</style>
