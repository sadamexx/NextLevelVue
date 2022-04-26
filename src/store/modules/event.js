import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3, //moved here from EventList
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  createEvent({ commit, dispatch, rootState }, event) {
    // console.log('User creating event is ' + rootState.user.user.name)
    // dispatch('moduleName/actionToCall', null, { root: true })
    //calling action inside another NameSpaced Module
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event was created successfully',
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page) //added return to line
      .then((response) => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events' + error.response,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, state }, id) {
    if (id == state.event.id) {
      return state.event
    }
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event //returning event from the action
    } else {
      return EventService.getEvent(id).then((res) => {
        commit('SET_EVENT', res.data)
        return res.data //returning event from action
      })
      // .catch((err) => {
      //   const notification = {
      //     type: 'error',
      //     message: 'There was a problem fetching the event' + err.res,
      //   }
      //   dispatch('notification/add', notification, { root: true })
      // }) no longer using because we will create a not found view
    }
  },
}

export const getters = {
  catLength: (state) => {
    return state.categories.length
  },
  doneTodos: (state) => {
    return state.todos.filter((todo) => todo.done)
  },
  activeTodos: (state, getters) => {
    return state.todos.length - getters.doneTodos.length
  },
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
}
