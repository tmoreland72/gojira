<template>
   <div class="row justify-start items-center q-gutter-md">
      <!--List Template Selector-->
      <q-select
         color="primary"
         dense
         emit-value
         filled
         map-options
         :options="options"
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
</template>

<script>
export default {
   props: {
      options: {
         type: Array,
         required: true,
      },
      groupBy: {
         type: String,
      },
      handleGroupBy: {
         type: Function,
         required: true,
      },
      filterBy: {
         type: String,
      },
      handleFilterInput: {
         type: Function,
         required: true,
      }
   }
}
</script>

<style scoped>

</style>
