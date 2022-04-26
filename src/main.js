import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import BaseIcon from '@/components/BaseIcon.vue'
// Vue.component('BaseIcon', BaseIcon)
// //always goes before newVue this is only one way

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'nprogress/nprogress.css'
import DateFilter from './filters/date'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.filter('date', DateFilter)

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
