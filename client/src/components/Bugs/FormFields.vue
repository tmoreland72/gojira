<template>
   <div class="column q-gutter-md">
      <q-select
         autofocus
         filled
         label="Project"
         :options="listProjectNames()"
         style="width: 320px; max-width: 95%;"
         v-model="formData.project"
      />

      <q-select
         fill-input
         filled
         @filter="handleFilterCategories"
         hide-selected
         input-debounce="0"
         @input-value="setCategory"
         label="Category"
         :options="options.categories"
         style="width: 320px; max-width: 95%;"
         use-input
         :value="formData.category"
      />

      <q-input
         filled
         label="Name"
         style="width: 320px; max-width: 95%;"
         v-model="formData.name"
      />

      <q-select
         autofocus
         filled
         label="Severity"
         :options="options.severity"
         style="width: 320px; max-width: 95%;"
         v-model="formData.severity"
      />

      <q-select
         autofocus
         filled
         label="Priority"
         :options="options.priority"
         style="width: 320px; max-width: 95%;"
         v-model="formData.priority"
      />

      <q-select
         filled
         label="Status"
         style="width: 160px;"
         :options="options.status"
         v-model="formData.status"
      />

      <q-input
         autogrow
         filled
         label="Description"
         style="width: 95%;"
         v-model="formData.description"
      />
   </div>
</template>

<script>
export default {
   props: {
      formData: {
         type: Object,
         required: true,
      },
      options: {
         type: Object,
         required: true,
      },
      setCategory: {
         type: Function,
         required: true,
      },
      handleFilterCategories: {
         type: Function,
         required: true,
      },
      listProjectNames: {
         type: Function,
         required: true,
      },
   },
}
</script>

<style scoped>

</style>
