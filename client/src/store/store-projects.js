import Vue from 'vue'
import uniq from 'lodash/uniq'

import * as api from 'src/helpers/api'
import { currentTime } from 'src/helpers/time'
import { customid } from 'src/helpers/uid'
import { sortObject, filterArray, groupArray } from 'src/helpers/sort'

const state = {
   items: {},
   groupBy: "",
   sortFields: ["name"],
   filterBy: "",
}

const mutations = {
   addProject: (state, payload) => {
      Vue.set(state.items, payload.id, payload.item)
   },

   updateProject: (state, payload) => {
      Object.assign(state.items[payload.id], payload.updates)
   },

   setProjects: (state, value) => {
      state.items = value
   },

   setSortFields: (state, value) => {
      state.sortFields = value
   },

   setFilterBy: (state, value) => {
      state.filterBy = value
   },

   setGroupBy: (state, value) => {
      state.groupBy = value
   }
}

const getters = {
   enriched: (state, getters, rootState, rootGetters) => {
      let items = {...state.items}
      let response = {}
      Object.keys(items).map(key => {
         let tasks = rootGetters["tasks/filteredByProject"](items[key].name)
         let openTasks = tasks.filter(task => task.status === "Open")
         let bugs = rootGetters["bugs/filteredByProject"](items[key].name)
         let openBugs = tasks.filter(bug => bug.status === "Open")

         let item = {
            ...items[key],
            tasks: {
               total: tasks.length,
               open: openTasks.length,
            },
            bugs: {
               total: bugs.length,
               open: openBugs.length,
            }
         }
         response[key] = item
      })
      return response
   },

   sorted: (state, getters) => {
      let items = getters.enriched
      return sortObject(items, state.sortFields)
   },

   filtered: (state, getters) => {
      let items = getters.sorted
      return filterArray(items, state.filterBy)
   },

   grouped: (state, getters) => {
      let items = getters.filtered
      return groupArray(items, state.groupBy)
   },

   nameList: (state, getters) => {
      console.log("nameList")
      let items = getters.sorted
      let res = []
      items.map(item => {
         if (item.status !== "Archived") {
            res.push(item.name)
         }
      })
      console.log("nameList", uniq(res))
      return uniq(res)
   }
}

const actions = {
   async getProjects({commit}) {
      let result = await api.getProjects()
      if (result.success) {
         let payload = {}
         result.data.map(item => {
            payload[item.id] = item
         })
         commit("setProjects", payload)
      } else {
         return false
      }
   },

   async createProject({commit}, item) {
      const id = customid({})
      let payload = {
         id,
         item: {
            ...item,
            id,
            creationTime: currentTime()
         },
      }
      let result = await api.createProject(payload.item)
      if (result.success) {
         commit('addProject', payload)
         return result.data
      } else {
         return false
      }
   },

   updateProject({state, commit}, props) {
      const { id, updates } = props

      // Update backend

      // Update store (if backend successful)
      commit('updateProject', props)
      return state.items[id]
   },

   async deleteProject({commit, dispatch}, id) {
      // Update backend
      let result = await api.deleteProject(id)

      if (result.success) {
         // Update store (if backend successful)
         dispatch('getProjects')
         return true
      } else {
         return false
      }
   }
}

export default {
   namespaced: true,
   state,
   mutations,
   getters,
   actions,
}
