import * as api from 'src/helpers/api'
import { currentTime } from 'src/helpers/time'
import { customid } from 'src/helpers/uid'
import { sortObject, filterArray, filterArchived, groupArray } from 'src/helpers/sort'
import Vue from 'vue'

const COLLECTION = 'ideas'

const state = {
   items: {},
   filterBy: '',
   groupBy: '',
   showArchived: false,
   sortFields: ['project', 'created'],
}

const mutations = {
   addItem: (state, payload) => {
      Vue.set(state.items, payload.id, payload.item)
   },

   updateItem: (state, payload) => {
      Object.assign(state.items[payload.id], payload.updates)
   },

   setItems: (state, value) => {
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
   },
}

const getters = {
   sorted: (state) => {
      let items = state.items
      return sortObject(items, state.sortFields)
   },

   noArchives: (state, getters) => {
      let items = getters.sorted
      return filterArchived(items)
   },

   filtered: (state, getters) => {
      let items = []
      if (state.showArchived) {
         items = getters.sorted
      } else {
         items = getters.noArchives
      }
      return filterArray(items, state.filterBy)
   },

   filteredByProject: (state, getters) => (project) => {
      let items = getters.sorted
      return filterArray(items, project, ['project'])
   },

   grouped: (state, getters) => {
      let items = getters.filtered
      return groupArray(items, state.groupBy)
   },

   categoryList: (state, getters) => {
      let items = getters.noArchives
      let res = []
      items.map(item => {
         if (!res.includes(item.category)) {
            res.push(item.category)
         }
      })
      return res
   },
}

const actions = {
   async getItems({ commit }) {
      let result = await api.getItems(COLLECTION)
      if (result.success) {
         let payload = {}
         result.data.map(item => {
            payload[item.id] = item
         })
         commit('setItems', payload)
      } else {
         return false
      }
   },

   async createItem({ commit }, item) {
      const id = customid({})
      let payload = {
         id,
         item: {
            ...item,
            id,
            created: currentTime(),
         },
      }
      let result = await api.createItem(COLLECTION, payload.item)
      if (result.success) {
         commit('addItem', payload)
         return result.data
      } else {
         return false
      }
   },

   async updateItem({ state, commit }, props) {
      const { id, updates } = props
      let payload = {
         id,
         updates: {
            ...updates,
            updated: currentTime(),
         },
      }
      let result = await api.updateItem(COLLECTION, id, payload.updates)
      if (result.success) {
         commit('updateItem', props)
         return true
      } else {
         return false
      }
   },

   async deleteItem({ commit, dispatch }, id) {
      let result = await api.deleteItem(COLLECTION, id)
      if (result.success) {
         dispatch('getItems')
         return true
      } else {
         return false
      }
   },
}

export default {
   namespaced: true,
   state,
   mutations,
   getters,
   actions,
}
