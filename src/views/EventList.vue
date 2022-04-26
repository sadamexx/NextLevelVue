<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev page
      </router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page
    </router-link>
    <!-- <BaseIcon /> -->
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
// // import BaseIcon from '../components/BaseIcon.vue'
// import EventService from '../services/EventService.js'
import { mapState } from 'vuex'
import store from '@/store/index.js'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1 //get the event page#
  store
    .dispatch('event/fetchEvents', {
      page: currentPage, //what page we are on
    })
    .then(() => {
      routeTo.params.page = currentPage //sending currentPage into the component
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
    // BaseIcon,
  },
  // data() {
  //   return {
  //     events: [],
  //   }
  // },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  // const currentPage = parseInt(routeTo.query.page) || 1 //get the event page#
  // store
  //   .dispatch('event/fetchEvents', {
  //     page: currentPage, //what page we are on
  //   })
  //   .then(() => {
  //     routeTo.params.page = currentPage //sending currentPage into the component
  //     next()
  //   }) all this moved out into a functtion above
  // },
  // created() {
  //   this.perPage = 3 //moving this to perPage into the state once we move action to route guard

  //   this.$store.dispatch('event/fetchEvents', {
  //     //move action to route guard
  //     perPage: this.perPage, //how many items to display per page
  //     page: this.page, //what page we are on
  //   })
  // },all of this is now beeing handled by routeGuard o sea the beforeRouteEnter
  computed: {
    // page() {
    //   //what page we are currently on
    //   return parseInt(this.$route.query.page) || 1
    // }, moved up to beforeRouteEnter
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage //access perPage through state with .event
    },
    ...mapState(['event', 'user']),
  },
}
</script>

<style></style>
