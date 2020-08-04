import Vue from 'vue'
import Vuex from 'vuex'

import projects from './store-projects'
import tasks from './store-tasks'
import bugs from './store-bugs'
import ideas from './store-ideas'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      projects,
      tasks,
      bugs,
      ideas,
    },

    strict: process.env.DEV
  })

  return Store
}
