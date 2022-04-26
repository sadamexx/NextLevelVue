import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import User from '../views/User.vue'
import NProgress from 'nprogress'
import store from '@/store/index.js'
import NotFound from '@/views/NotFound.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'
import Example from '@/views/Example.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history', //uses history.pushstate
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true, //sendd params in as props
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true, //params is set as component props (true)
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event //the event in red is from Action
            next()
          }) //this runs after global beforeEach(below)
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            } //on the error redirect to route 404 passing in name of
          }) //missing resource, which is event
      }, // alias: '/about',
    },
    {
      path: '/event-create',
      name: 'event-create',
      component: EventCreate,
    },
    {
      path: '/user/:username',
      name: 'user',
      component: User,
      props: true,
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true, //send in 'resource' param as a prop
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue,
      props: true,
    },
    {
      path: '/example',
      component: Example,
    },
    {
      path: '*', //catches all navigation that doesnt match with a  route
      redirect: { name: '404', params: { resource: 'page' } }, //specify missing resource
    },
    // {
    //   path: '/about',
    //   redirect: { name: 'about' },
    // },
  ],
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
