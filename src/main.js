import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes';
import VueResource from 'vue-resource';
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import VModal from 'vue-js-modal';
import {store} from './store/store';

library.add(faArrowRightToBracket)
library.add(faProjectDiagram)
library.add(faHome)
library.add(faDeleteLeft)
library.add(faPen)
library.add(faCartShopping)
library.add(faStore)
library.add(faAddressCard)
library.add(faUser)
library.add(faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Toaster, {timeout: 5000});
Vue.use(VModal);


const router = new VueRouter({
  mode : 'history',
  routes,
  store
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
