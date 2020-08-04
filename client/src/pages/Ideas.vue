<template>
   <q-page padding>
      <div class="text-grey-8">
         <!--Heading-->
         <span class="text-h5">Ideas</span>
         <q-separator/>

         <!--List-->
         <div class="q-pa-lg">

            <!--List Group By and Filter-->
            <idea-list-group-filter
               :options="options.groupBy"
               :groupBy="groupBy"
               :handleGroupBy="(value) => mxHandleGroupBy('ideas', value)"
               :filterBy="filterBy"
               :handleFilterInput="(value) => mxHandleFilterInput('ideas', value)"
            />

            <!--List Actions-->
            <list-actions
               module="ideas"
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
                  <idea-list-header
                     :sortFields="sortFields"
                     :handleSort="(value) => mxHandleSort('ideas', value)"
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
                           :caption="categoryItems.length + ' ideas'"
                           expand-separator
                           :label="categoryItems[0][groupBy]"
                           v-model="expanded"
                        >
                           <idea-list-row
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
                     <idea-list-row
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

const MODULE = "ideas"

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
               { label: "Group by category", value: "category" },
               { label: "Group by status", value: "status" },
            ]
         },
      }
   },

   computed: {
      ...mapGetters("ideas", ["filtered", "grouped"]),
      ...mapState("ideas", ["sortFields", "filterBy", "groupBy"])
   },

   methods: {
      ...mapActions(["ideas/getItems", "ideas/deleteItem"]),

      async handleDelete() {
         this.loading.delete = true
         await this["ideas/deleteItem"](this.mxSelectedId)
         this.dialog.delete = false
         this.mxResetSelected()
         this.loading.delete = false
      },

      handleUpdate(item) {
         this.$router.push({
            name: "ideas-update",
            params: {
               id: this.mxSelectedId
            }
         })
      },

      async loadItems() {
         this.loading.get = true
         await this["ideas/getItems"]()
         this.loading.get = false
      }
   },

   mixins: [
      mxDetailsPanel,
      mxCopyToClipboard,
      mxFilterSort
   ],

   components: {
      IdeaListGroupFilter: require("components/Ideas/ListHeaderGroupFilter.vue").default,
      IdeaListHeader: require("components/Ideas/ListHeaderColumns.vue").default,
      IdeaListRow: require("components/Ideas/ListRowColumns.vue").default,
      ListActions: require("components/Shared/ListActions.vue").default,
      ListEmpty: require("components/Shared/ListEmpty.vue").default,
      ListLoading: require("components/Shared/ListLoading.vue").default,
      DetailsPanel: require("components/Shared/DetailsDrawer.vue").default,
      DeleteConfirmation: require("components/DeleteConfirmation.vue").default,
   },

}
</script>

<style scoped>

</style>
