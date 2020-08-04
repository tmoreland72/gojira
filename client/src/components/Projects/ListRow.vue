<template>
   <div class="bg-white text-grey-7 text-body2">
      <q-item
         :active="selected === item.id"
         active-class="bg-primary text-white"
         clickable
         @click="() => handleClickItem(item)"
      >
         <q-item-section>
            <div class="row items-center q-gutter-sm">
               <div class="col-1">
                  <q-avatar :icon="item.icon"/>
               </div>
               <div class="col">
                  {{item.id}}
                  <q-icon
                     color="grey-5"
                     name="content_copy"
                     size="xs"
                     @click.stop="() => copyValue(item.id)"
                     style="margin-left: 4px; margin-top: -10px;"
                  />
               </div>
               <div class="col">{{item.name}}</div>
               <div class="col">{{item.status}}</div>
               <div class="col">
                  <div class="row justify-evenly">
                     {{item.tasks.open}}
                     <q-linear-progress
                        size="24px"
                        :color="getPercentageColor(item,'tasks')"
                        :value="Number(getPercentage(item,'tasks'))"
                        style="width: 70%;"
                     >
                        <div class="absolute-full flex flex-center">
                           <q-badge
                              color="white"
                              :text-color="getPercentageColor(item,'tasks')"
                              :label="getPercentageString(item,'tasks')"
                           />
                        </div>
                     </q-linear-progress>
                     {{item.tasks.total}}
                  </div>
               </div>
               <div class="col">
                  <div class="row justify-evenly">
                     {{item.bugs.open}}
                     <q-linear-progress
                        size="24px"
                        :color="getPercentageColor(item,'bugs')"
                        :value="Number(getPercentage(item,'bugs'))"
                        style="width: 70%;"
                     >
                        <div class="absolute-full flex flex-center">
                           <q-badge
                              color="white"
                              :text-color="getPercentageColor(item,'bugs')"
                              :label="getPercentageString(item,'bugs')"
                           />
                        </div>
                     </q-linear-progress>
                     {{item.bugs.total}}
               </div>
            </div>
         </div>
      </q-item-section>
   </q-item>
   </div>
</template>

<script>
export default {
   props: {
      selected: {
         type: String,
      },
      item: {
         type: Object,
      },
      handleClickItem: {
         type: Function,
      },
      copyValue: {
         type: Function,
      },
      getPercentage: {
         type: Function,
      },
      getPercentageColor: {
         type: Function
      },
      getPercentageString: {
         type: Function,
      }
   }
}
</script>

<style scoped>

</style>
