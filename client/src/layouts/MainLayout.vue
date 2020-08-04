<template>
   <q-layout view="hHh lpR fFf">
      <q-header elevated>
         <q-toolbar>
            <q-btn
               flat
               dense
               round
               icon="menu"
               aria-label="Menu"
               @click="mini = !mini"
            />

            <q-toolbar-title>
               <q-btn flat :to="{name: 'home'}">
                  <q-img src="statics/images/bull.png" style="height: 40px; width: 40px;"/>
                  <span class="q-ml-sm">Gojira</span>
               </q-btn>

            </q-toolbar-title>

            <div class="text-accent">Quasar v{{ $q.version }}</div>
         </q-toolbar>
      </q-header>

      <q-drawer
         v-model="left"
         bordered
         :mini="mini"
         content-class="q-pt-md bg-grey-1 text-grey-8"
      >
         <q-list>
            <!--Projects-->
            <q-item clickable v-ripple :to="{name: 'projects'}">
               <q-item-section avatar>
                  <q-icon name="fas fa-rocket"/>
               </q-item-section>
               <q-item-section>
                  <q-item-label>Projects</q-item-label>
               </q-item-section>
            </q-item>

            <!--Tasks-->
            <q-item clickable v-ripple :to="{name: 'tasks'}">
               <q-item-section avatar>
                  <q-icon name="fas fa-tasks"/>
               </q-item-section>
               <q-item-section>
                  <q-item-label>Tasks</q-item-label>
               </q-item-section>
            </q-item>

            <!--Bugs-->
            <q-item clickable v-ripple :to="{name: 'bugs'}">
               <q-item-section avatar>
                  <q-icon name="fas fa-bug"/>
               </q-item-section>
               <q-item-section>
                  <q-item-label>Bugs</q-item-label>
               </q-item-section>
            </q-item>

            <!--Ideas-->
            <q-item clickable v-ripple :to="{name: 'ideas'}">
               <q-item-section avatar>
                  <q-icon name="far fa-lightbulb"/>
               </q-item-section>
               <q-item-section>
                  <q-item-label>Ideas</q-item-label>
               </q-item-section>
            </q-item>

            <!--Releases-->
            <q-item clickable v-ripple :to="{name: 'releases'}">
               <q-item-section avatar>
                  <q-icon name="fas fa-code-branch"/>
               </q-item-section>
               <q-item-section>
                  <q-item-label>Releases</q-item-label>
               </q-item-section>
            </q-item>

            <!--Roadmap-->
            <q-item clickable v-ripple :to="{name: 'roadmap'}">
               <q-item-section avatar>
                  <q-icon name="fas fa-directions"/>
               </q-item-section>
               <q-item-section>
                  <q-item-label>Roadmap</q-item-label>
               </q-item-section>
            </q-item>

         </q-list>
      </q-drawer>

      <q-page-container>
         <router-view/>
      </q-page-container>

      <!-- Footer Buttons -->
      <template>
         <div class="lt-md">
            <q-footer elevated>
               <q-tabs class="bg-grey-9 text-white">
                  <q-route-tab
                     icon="fas fa-rocket"
                     :to="{name: 'projects'}"
                  />
                  <q-route-tab
                     icon="fas fa-tasks"
                     :to="{name: 'tasks'}"
                  />
                  <q-route-tab
                     icon="fas fa-bug"
                     :to="{name: 'bugs'}"
                  />
                  <q-route-tab
                     icon="far fa-lightbulb"
                     :to="{name: 'ideas'}"
                  />
                  <q-route-tab
                     icon="fas fa-code-branch"
                     :to="{name: 'releases'}"
                  />
                  <q-route-tab
                     icon="fas fa-directions"
                     :to="{name: 'roadmap'}"
                  />
               </q-tabs>
            </q-footer>
         </div>
      </template>
   </q-layout>
</template>

<script>
export default {
   name: "MainLayout",

   data() {
      return {
         left: true,
         mini: true,
      }
   }
}
</script>
