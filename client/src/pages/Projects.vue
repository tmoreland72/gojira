<template>
   <q-page padding>
      <div class="text-grey-8">
         <!--Heading-->
         <span class="text-h5">Projects</span>
         <q-separator/>

         <!--List-->
         <div class="q-pa-lg">

            <!--List Header-->
            <div class="row justify-start items-center q-gutter-md">
               <!--List Template Selector-->
               <q-select
                  color="primary"
                  dense
                  emit-value
                  filled
                  map-options
                  :options="list.template.options"
                  style="min-width: 200px;"
                  :value="groupBy"
                  @input="(value) => handleGroupBy(value)"
               />

               <q-input
                  dense
                  filled
                  style="width: 300px;"
                  :value="filterBy"
                  @input="(value) => handleFilterInput(value)"
               >
                  <template v-slot:append>
                     <q-icon color="grey-5" name="fas fa-filter" size="xs"/>
                  </template>
               </q-input>
            </div>

            <!--List Actions-->
            <list-actions
               :selected="selected"
               :handleUpdate="handleUpdate"
               :loadProjects="loadProjects"
               :loading="loading"
               :dialog="dialog"
            />

            <!--List Contents-->
            <div class="q-mt-lg">
               <q-list bordered separator>
                  <!--Header Row-->
                  <list-header
                     :sortFields="sortFields"
                     :handleSort="handleSort"
                  />

                  <!--Loading-->
                  <template v-if="loading.get">
                     <q-item>
                        <div class="full-width flex flex-center" style="min-height: 240px;">
                           <q-spinner color="primary" size="100px" :thickness="10" />
                        </div>
                     </q-item>
                  </template>

                  <!--Grouping Rows-->
                  <template v-else-if="groupBy.length">
                     <div v-for="categoryItems in grouped">
                        <q-expansion-item
                           class="bg-grey-4 text-grey-8 text-subtitle1"
                           :caption="categoryItems.length + ' projects'"
                           expand-separator
                           :label="categoryItems[0][groupBy]"
                           v-model="expanded"
                        >
                           <list-row
                              v-for="item in categoryItems"
                              :item="item"
                              :key="item.id"
                              :selected="selected"
                              :handleClickItem="handleClickItem"
                              :copyValue="copyValue"
                              :getPercentage="getPercentage"
                              :getPercentageColor="getPercentageColor"
                              :getPercentageString="getPercentageString"
                           />
                        </q-expansion-item>
                     </div>
                  </template>

                  <!--Data Rows-->
                  <template v-else-if="filtered.length">
                     <list-row
                        v-for="item in filtered"
                        :item="item"
                        :key="item.id"
                        :selected="selected"
                        :handleClickItem="handleClickItem"
                        :copyValue="copyValue"
                        :getPercentage="getPercentage"
                        :getPercentageColor="getPercentageColor"
                        :getPercentageString="getPercentageString"
                     />
                  </template>

                  <!--No Data-->
                  <template v-else>
                     <q-item>
                        <div class="full-width flex flex-center" style="min-height: 240px;">
                           No data found
                        </div>
                     </q-item>
                  </template>
               </q-list>
            </div>
         </div>

      </div>

      <!--Delete Confirmation-->
      <q-dialog v-model="dialog.delete">
         <q-card>
            <q-card-section>
               <span>Are you sure you want to delete this project?  You could just archive it?</span>
            </q-card-section>
            <q-card-actions>
               <div class="row justify-end q-gutter-md">
                  <q-btn color="primary" flat label="Whoops! Nevermind" v-close-popup/>
                  <q-btn color="negative" label="Continue Delete" v-close-popup @click="handleDelete"/>
               </div>
            </q-card-actions>
         </q-card>
      </q-dialog>
   </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex"
import { copyToClipboard, Notify } from "quasar"

export default {
   data() {
      return {
         dialog: {
            delete: false,
         },
         expanded: true,
         list: {
            template: {
               options: [
                  { label: "No Grouping", value: "" },
                  { label: "Group by category", value: "category" },
                  { label: "Group by status", value: "status" },
               ]
            },
         },
         loading: {
            get: false,
            delete: false,
         },
         selected: null,
      }
   },

   computed: {
      ...mapGetters("projects", ["filtered", "grouped"]),
      ...mapState("projects", ["sortFields", "filterBy", "groupBy"])
   },

   methods: {
      ...mapActions("projects", ["getProjects", "deleteProject"]),
      ...mapMutations("projects", ["setSortFields", "setFilterBy", "setGroupBy"]),

      copyValue(value) {
         copyToClipboard(value)
         .then(() => {
            Notify.create("Copied!")
         })
      },

      getPercentage(item, val) {
         let obj = item[val]
         if (obj.total === 0) return 0
         return ((obj.total - obj.open) / obj.total).toFixed(2)
      },

      getPercentageColor(item, val) {
         if (item[val].total === 0) return "primary"

         let percentage = this.getPercentage(item, val)
         if (percentage >= .5) {
            return "positive"
         } else {
            return "negative"
         }
      },

      getPercentageString(item, val) {
         let percentage = this.getPercentage(item, val)
         percentage = Math.round(percentage * 100)
         return String(percentage) + "%"
      },

      handleClickItem(item) {
         this.selected = item.id
      },

      async handleDelete() {
         this.loading.delete = true
         await this.deleteProject(this.selected)
         this.loading.delete = false
      },

      handleFilterInput(value) {
         this.setFilterBy(value)
      },

      handleSort(field) {
         let sortFields = [...this.sortFields]
         if (sortFields.includes(field)) {
            let index = sortFields.indexOf(field)
            sortFields.splice(index, 1)
         } else {
            sortFields.push(field)
         }
         this.setSortFields(sortFields)
      },

      handleGroupBy(field) {
         console.log("groupby", field)
         this.setGroupBy(field)
      },

      handleUpdate(item) {
         this.$router.push({
            name: "projects-update",
            params: {
               id: this.selected
            }
         })
      },

      async loadProjects() {
         this.loading.get = true
         await this.getProjects()
         this.loading.get = false
      }
   },

   components: {
      ListActions: require("components/Projects/ListActions.vue").default,
      ListHeader: require("components/Projects/ListHeader.vue").default,
      ListRow: require("components/Projects/ListRow.vue").default,
   },

   beforeMount() {
      //this.loadProjects()
   }
}
</script>

<style scoped>

</style>
