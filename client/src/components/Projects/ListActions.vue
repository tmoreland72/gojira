<template>
   <div class="q-mt-lg row justify-between items-center">
      <div class="row q-gutter-sm">
         <!--Add Button-->
         <q-btn
            color="primary"
            icon="add"
            label="Add"
            size="sm"
            :to="{name: 'projects-add'}"
         />

         <!--Edit Button-->
         <q-btn
            color="grey-5"
            :disable="!selected"
            icon="edit"
            label="Update"
            size="sm"
            @click="handleUpdate"
         />

         <!--Delete Button-->
         <q-btn
            color="negative"
            :disable="!selected"
            icon="delete_forever"
            label="Delete"
            :loading="loading.delete"
            size="sm"
            @click="dialog.delete = true"
         />
      </div>

      <!--Refresh Button-->
      <div class="row q-gutter-sm">
         <q-btn text-color="grey-7" color="white" round icon="sync" size="sm" @click="loadProjects"/>
      </div>
   </div>

</template>

<script>
export default {
   props: {
      selected: {
         type: String,
      },
      handleUpdate: {
         type: Function,
      },
      loadProjects: {
         type: Function,
      },
      dialog: {
         type: Object,
      },
      loading: {
         type: Object,
      }
   }
}
</script>

<style scoped>

</style>
