<template>
   <q-page padding>
      <div class="text-grey-8">
         <!--Heading-->
         <span class="text-h5">Projects</span>
         <q-separator/>

         <!--Form-->
         <div class="q-ma-xl">
            <span class="text-body1">Add Project</span>

            <q-form class="q-mt-md q-gutter-md" @submit="handleSubmit()">

               <q-select
                  autofocus
                  fill-input
                  filled
                  @filter="handleFilterCategories"
                  hide-selected
                  input-debounce="0"
                  @input-value="setModel"
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
                  filled
                  label="Status"
                  style="width: 160px;"
                  :options="options.status"
                  v-model="formData.status"
               />

               <!--Project Icon-->
               <div class="q-mt-lg column">
                  <div class="text-subtitle1">
                     Select a project icon:
                  </div>
                  <div>
                     <q-input
                        filled
                        label="Filter"
                        v-model="picker.filter"
                        style="width: 400px; max-width: 95%;"
                     >
                        <template v-slot:append>
                           <q-icon name="fas fa-filter" />
                        </template>
                     </q-input>
                  </div>
                  <div class="q-mt-md bg-grey-2" style="width: 400px; max-width: 95%;">
                     <q-icon-picker
                        :filter="picker.filter"
                        icon-set="fontawesome-v5"
                        :pagination.sync="picker.pagination"
                        v-model="formData.icon"
                        style="height: 320px;"
                     />
                  </div>

               </div>

               <!--Buttons-->
               <div class="q-mt-xl">
                  <div class="row justify-start q-gutter-md">
                     <q-btn label="Save" :loading="loading" type="submit" color="primary"/>

                     <q-btn flat label="Cancel" :to="{name: 'projects'}"/>
                  </div>
               </div>
            </q-form>
         </div>
      </div>
   </q-page>
</template>

<script>
import { mapActions } from "vuex"
import { Notify } from "quasar"

export default {
   data() {
      return {
         formData: {
            category: "",
            name: "",
            status: "Open",
            icon: "",
         },
         loading: false,
         picker: {
            filter: "",
            pagination: {
               itemsPerPage: 49,
               page: 0
            },
         },
         options: {
            status: ["Open", "On-Hold", "Completed", "Archived"],
            categories: ["34 Fame", "Personal", "Geek Force Academy"],
         }
      }
   },

   methods: {
      ...mapActions("projects", ["createProject"]),

      setModel(val) {
         this.formData.category = val
      },

      handleFilterCategories(val, update) {
         const categories = ["34 Fame", "Personal", "Geek Force Academy"]
         update(() => {
            if (val === '') {
               this.options.categories = categories
            } else {
               const needle = val.toLowerCase()
               this.options.categories = categories.filter(
                  v => v.toLowerCase().indexOf(needle) > -1
               )
            }
         })
      },

      async handleSubmit() {
         this.loading = true
         let result = await this.createProject(this.formData)
         this.loading = false
         if (result) {
            Notify.create("Project added!")
            this.$router.push({ name: "projects" })
         } else {
            Notify.create({
               type: "negative",
               message: "Add failed.  Please verify your values and try again",
               timeout: 4000,
               icon: "warning",
            })
         }
      }
   },
}
</script>

<style scoped>

</style>
