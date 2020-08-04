import Vue from 'vue'
import { currentTime } from 'src/helpers/time'
import uid from 'src/helpers/uid'

const state = {
   items: {},
   sortBy: "name",
   filter: "",
}

const mutations = {
   addItem: state => payload => {
      Vue.set(state.items, payload.id, payload.item)
   },

   updateItem: state => payload => {
      Object.assign(state.items[payload.id], payload.updates)
   },

   deleteItem: state => id => {
      Vue.delete(state.items, id)
   },

   setItems: state => value => {
      state.items = value
   },

   setSortBy: state => value => {
      state.sortBy = value
   },

   setFilter: state => value => {
      state.filter = value
   }
}

const getters = {
   sorted: state => sort => {
      let sorted = {}
      let keys = Object.keys(state.items)

      keys.sort((a, b) => {
         let taskA = state.items[a][state.sortBy].toLowerCase()
         let taskB = state.items[b][state.sortBy].toLowerCase()

         if (taskA > taskB) return 1
         else if (taskA < taskB) return -1
         else return 0
      })

      keys.map(key => {
         sorted[key] = state.items[key]
      })

      return sorted
   },

   filtered: getters => filter => {
      let items = getters.sorted
      let filtered = {}

      if (state.filter) {
         Object.keys(items).map(key => {
            if (
               items[key].name.toLowerCase().includes(state.filter.toLowerCase())
            ) {
               filtered[key] = items[key]
            }
         })
         return filtered
      }

      return items
   }

}

const actions = {
   createItem({commit}, item) {
      const id = uid()
      let payload = {
         id,
         item,
         creationTime: currentTime()
      }
      commit('addItem', payload)
   },

   updateItem({commit}, payload) {
      commit('updateItem', payload)
   },

   deleteItem({commit}, id) {
      commit('deleteItem', id)
   }
}

export default {
   namespaced: true,
   state,
   mutations,
   getters,
   actions,
}
