<template>
   <q-page padding>
      <div class="text-grey-8">
         <!--Heading-->
         <span class="text-h5">Tasks</span>
         <q-separator/>

         <!--List-->
         <div class="q-pa-lg">

            <!--List Group By and Filter-->
            <task-list-group-filter
               :options="options.groupBy"
               :groupBy="groupBy"
               :handleGroupBy="(value) => mxHandleGroupBy('tasks', value)"
               :filterBy="filterBy"
               :handleFilterInput="(value) => mxHandleFilterInput('tasks', value)"
            />

            <!--List Actions-->
            <list-actions
               module="tasks"
               :selected="mxSelectedId"
               :handleUpdate="handleUpdate"
               :loadItems="loadItems"
               :loading="loading"
               :dialog="dialog"
            />

            <!--List Contents-->
            <div class="q-mt-lg">
               <q-list bordered separator>
                  <!--Header Row-->
                  <task-list-header
                     :sortFields="sortFields"
                     :handleSort="(value) => mxHandleSort('tasks', value)"
                  />

                  <!--Loading-->
                  <template v-if="loading.get">
                     <list-loading />
                  </template>

                  <!--Grouping Rows-->
                  <template v-else-if="groupBy.length">
                     <div v-for="categoryItems in grouped">
                        <q-expansion-item
                           class="bg-grey-4 text-grey-8 text-subtitle1"
                           :caption="categoryItems.length + ' tasks'"
                           expand-separator
                           :label="categoryItems[0][groupBy]"
                           v-model="expanded"
                        >
                           <task-list-row
                              v-for="item in categoryItems"
                              :item="item"
                              :key="item.id"
                              :selected="mxSelectedId"
                              :handleClickItem="mxHandleClickItem"
                              :copyValue="mxCopyValue"
                           />
                        </q-expansion-item>
                     </div>
                  </template>

                  <!--Data Rows-->
                  <template v-else-if="filtered.length">
                     <task-list-row
                        v-for="item in filtered"
                        :item="item"
                        :key="item.id"
                        :selected="mxSelectedId"
                        :handleClickItem="mxHandleClickItem"
                        :copyValue="mxCopyValue"
                     />
                  </template>

                  <!--No Data-->
                  <template v-else>
                     <list-empty />
                  </template>
               </q-list>
            </div>
         </div>
      </div>

      <!--Details Drawer-->
      <details-panel
         :mxSelectedId="mxSelectedId"
         :mxSelectedItem="mxSelectedItem"
      />

      <!--Delete Confirmation-->
      <delete-confirmation
         :show="dialog.delete"
         :handleDelete="handleDelete"
         :handleCancelDelete="() => dialog.delete = false"
      />
   </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex"

import mxDetailsPanel from 'src/mixins/mxDetailsPanel'
import mxCopyToClipboard from 'src/mixins/mxCopyToClipboard'
import mxFilterSort from 'src/mixins/mxFilterSort'

const MODULE = "tasks"

export default {
   data() {
      return {
         dialog: {
            delete: false,
         },
         expanded: true,
         loading: {
            get: false,
            delete: false,
         },
         options: {
            groupBy: [
               { label: "No Grouping", value: "" },
               { label: "Group by project", value: "project" },
               { label: "Group by severity", value: "severity" },
               { label: "Group by status", value: "status" },
            ]
         },
      }
   },

   computed: {
      ...mapGetters("tasks", ["filtered", "grouped"]),
      ...mapState("tasks", ["sortFields", "filterBy", "groupBy"])
   },

   methods: {
      ...mapActions(["tasks/getItems", "tasks/deleteItem"]),

      async handleDelete() {
         this.loading.delete = true
         await this["tasks/deleteItem"](this.mxSelectedId)
         this.dialog.delete = false
         this.loading.delete = false
      },

      handleUpdate(item) {
         this.$router.push({
            name: "tasks-update",
            params: {
               id: this.mxSelectedId
            }
         })
      },

      async loadItems() {
         this.loading.get = true
         await this["tasks/getItems"]()
         this.loading.get = false
      }
   },

   mixins: [
      mxDetailsPanel,
      mxCopyToClipboard,
      mxFilterSort
   ],

   components: {
      TaskListGroupFilter: require("components/Tasks/ListHeaderGroupFilter.vue").default,
      TaskListHeader: require("components/Tasks/ListHeaderColumns.vue").default,
      TaskListRow: require("components/Tasks/ListRowColumns.vue").default,
      ListActions: require("components/Shared/ListActions.vue").default,
      ListEmpty: require("components/Shared/ListEmpty.vue").default,
      ListLoading: require("components/Shared/ListLoading.vue").default,
      DetailsPanel: require("components/Shared/DetailsDrawer.vue").default,
      DeleteConfirmation: require("components/DeleteConfirmation.vue").default,
   },

   beforeMount() {
      //this.loadItems()
   }
}
</script>

<style scoped>

</style>
