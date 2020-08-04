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

      <category
         :handleFilterCategories="handleFilterCategories"
         :setCategory="setCategory"
         :options="options.categories"
         :formData="formData.category"
      />

      <q-input
         filled
         label="Summary"
         style="width: 320px; max-width: 95%;"
         v-model="formData.name"
      />

      <status :formData="formData" :options="options" />

      <description :formData="formData" />
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

   components: {
      Category: require("components/Shared/Fields/Category.vue").default,
      Description: require("components/Shared/Fields/Description.vue").default,
      Status: require("components/Shared/Fields/Status.vue").default,
   }
}
</script>

<style scoped>

</style>
