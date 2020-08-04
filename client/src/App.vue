<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { Loading } from "quasar"

export default {
   methods: {
      ...mapActions("projects", ["getProjects"]),
      ...mapActions(["tasks/getItems","bugs/getItems", "ideas/getItems"]),

      async initAppData() {
         Loading.show({
            spinnerColor: "white",
            messageColor: "white",
            backgroundColor: "primary",
            message: "Loading data...",
            spinnerSize: "140",
         })
         await Promise.all([
            this.getProjects(),
            this["tasks/getItems"](),
            this["bugs/getItems"](),
            this["ideas/getItems"](),
         ])
         .finally(() => {
            Loading.hide()
         })
      },
   },

   beforeMount() {
      this.initAppData()
   },

   beforeDestroy() {
      Loading.hide()
   }
}
</script>
