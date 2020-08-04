<template>
   <q-page padding>
      <div class="text-grey-8">
         <!--Heading-->
         <span class="text-h5">{{module.title}}</span>
         <q-separator/>

         <!--Form-->
         <div class="q-ma-xl">
            <span class="text-body1">Add {{module.singular}}</span>

            <q-form class="q-mt-md" @submit="handleSubmit()">
               <template v-if="module.name === 'tasks'">
                  <task-form-fields
                     :formData="formData"
                     :options="options"
                     :setCategory="setCategory"
                     :handleFilterCategories="handleFilterCategories"
                     :listProjectNames="listProjectNames"
                  />
               </template>

               <template v-else-if="module.name === 'bugs'">
                  <bug-form-fields
                     :formData="formData"
                     :options="options"
                     :setCategory="setCategory"
                     :handleFilterCategories="handleFilterCategories"
                     :listProjectNames="listProjectNames"
                  />
               </template>

               <template v-else-if="module.name === 'ideas'">
                  <idea-form-fields
                     :formData="formData"
                     :options="options"
                     :setCategory="setCategory"
                     :handleFilterCategories="handleFilterCategories"
                     :listProjectNames="listProjectNames"
                  />
               </template>

               <!--Buttons-->
               <div class="q-mt-xl">
                  <div class="row justify-start q-gutter-md">
                     <q-btn label="Save" :loading="loading" type="submit" color="primary"/>
                     <q-btn v-if="mode === 'add'" label="Save & Add Another" :loading="loading"
                     color="primary"
                            @click="handleSubmit('add')"/>
                     <q-btn flat label="Cancel" :to="{name: module.name}"/>
                  </div>
               </div>
            </q-form>
         </div>
      </div>
   </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { Notify } from 'quasar'
import uniq from 'lodash/uniq'

const OPTIONS = {
   tasks: {
      status: ['New', 'Open', 'On-Hold', 'Closed'],
      categories: ['Frontend', 'Backend'],
   },
   bugs: {
      priority: ['Urgent', 'High', 'Medium', 'Low'],
      severity: ['Critical', 'Major', 'Minor', 'Trivial'],
      status: ['New', 'Open', 'On-Hold', 'Closed'],
      categories: ['Frontend', 'Backend'],
   },
   ideas: {
      status: ['New', 'Approved', 'Rejected', 'Done'],
      categories: ['Product', 'Feature', 'Integration'],
   },
}

const FORMDATA = {
   tasks: {
      project: '',
      category: '',
      name: '',
      status: 'New',
      description: '',
   },
   bugs: {
      project: '',
      category: '',
      name: '',
      severity: 'Trivial',
      priority: 'Low',
      status: 'New',
      description: '',
   },
   ideas: {
      project: '',
      category: '',
      name: '',
      status: 'New',
      description: '',
   },
}

export default {
   props: {
      mode: {
         type: String,
         required: true,
      },
      module: {
         name: {
            type: String,
            required: true,
         },
         title: {
            type: String,
            required: true,
         },
         singular: {
            type: String,
            required: true,
         },
      },
   },

   data() {
      return {
         formData: FORMDATA[this.module.name],
         loading: false,
         options: OPTIONS[this.module.name],
      }
   },

   computed: {
      ...mapGetters([
         'projects/nameList',
         'tasks/categoryList',
         'bugs/categoryList',
         'ideas/categoryList',
      ]),
      ...mapState([
         'tasks/items',
         'bugs/items',
         'ideas/items',
      ]),
   },

   methods: {
      ...mapActions([
         'tasks/createItem',
         'tasks/updateItem',
         'bugs/createItem',
         'bugs/updateItem',
         'ideas/createItem',
         'ideas/updateItem',
      ]),

      handleFilterCategories(val, update) {
         const module = this.module.name
         const defaultCategories = OPTIONS[module].categories
         const dataCategories = this[module + '/categoryList']
         const categories = uniq(defaultCategories.concat(dataCategories))
         update(() => {
            if (val === '') {
               this.options.categories = categories
            } else {
               const needle = val.toLowerCase()
               this.options.categories = categories.filter(
                  v => v.toLowerCase().indexOf(needle) > -1,
               )
            }
         })
      },

      listProjectNames() {
         return this['projects/nameList']
      },

      setCategory(val) {
         this.formData.category = val
      },

      async handleSubmit(option) {
         const MODULE = this.module.name
         const ID = this.$route.params.id

         this.loading = true
         let result
         if (this.mode === 'add') {
            result = await this[MODULE + '/createItem'](this.formData)
         } else {
            result = await this[MODULE + '/updateItem']({ id: ID, updates: this.formData })
         }
         this.loading = false
         if (result) {
            Notify.create('We have great success!')
            this.formData = FORMDATA[MODULE]
            if (!option) {
               this.$router.push({ name: MODULE })
            }
         } else {
            Notify.create({
               type: 'negative',
               message: 'Operation failed.  Please verify your values and try again',
               timeout: 4000,
               icon: 'warning',
            })
         }
      },
   },

   components: {
      BugFormFields: require("components/Bugs/FormFields.vue").default,
      TaskFormFields: require("components/Tasks/FormFields.vue").default,
      IdeaFormFields: require("components/Ideas/FormFields.vue").default,
   },

   mounted() {
      if (this.mode === 'update') {
         const MODULE = this.module.name
         const ID = this.$route.params.id
         let items = {...this.$store._modules.root.state[MODULE].items}
         this.formData = {...items[ID]}
      }
   },
}
</script>

<style scoped>

</style>
