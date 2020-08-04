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
               <div class="col">{{item.created|mxPrettifyDate}}</div>
            </div>
         </q-item-section>
      </q-item>
   </div>
</template>

<script>
import mxFormatting from 'src/mixins/mxFormatting'

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
   },

   mixins: [mxFormatting],
}
</script>
