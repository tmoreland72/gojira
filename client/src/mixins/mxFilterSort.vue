<script>

export default {
   methods: {
      mxHandleFilterInput(module, value) {
         this.$store.commit(module + "/setFilterBy", value)
      },

      mxHandleSort(module, field) {
         let sortFields = [...this.sortFields]
         if (sortFields.includes(field)) {
            let index = sortFields.indexOf(field)
            sortFields.splice(index, 1)
         } else {
            sortFields.push(field)
         }
         this.$store.commit(module + "/setSortFields", sortFields)
      },

      mxHandleGroupBy(module, field) {
         this.$store.commit(module + "/setGroupBy", field)
      },
   },

}
</script>
