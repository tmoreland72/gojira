<template>
   <q-page class="flex flex-center">
      <q-img spinner-color="secondary" :src="randomImage" style="height: 70%; width: 70%;"/>
   </q-page>
</template>

<script>
export default {
   data() {
      return {
         randomImage: "",
         imageArray: [
            "statics/images/bull.png",
            "statics/images/bulldog.png",
            "statics/images/clan.png",
            "statics/images/deadly.png",
            "statics/images/fighter.png",
            "statics/images/samurai.png",
            "statics/images/undead.png",
         ]
      }
   },

   methods: {
      handleRandomImage() {
         this.randomImage = this.imageArray[Math.floor(Math.random() * (this.imageArray.length))]
      }
   },

   beforeMount() {
      this.handleRandomImage()
   }
}
</script>
