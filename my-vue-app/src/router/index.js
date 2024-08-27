<<<<<<< HEAD
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import UserPage from '../views/UserPage.vue'
import UserHistory from '../views/HistoryPage.vue'

const routes = [
  {
    path: '',
    name: 'home',
    component: HomeView
  },
  {
    path:'/register',
    name:'RegisterPage',
    component:RegisterPage
  },
  {
    path:'/login',
    name:'UserLogin',
    component:LoginPage
  },
  {
    path:'/:id/user/',
    name:'UserPage',
    component:UserPage
  },
  {
    path:'/:id/user/history',
    name:'UserHistory',
    component:UserHistory,
    props:true
  }
  
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

=======
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import UserPage from '../views/UserPage.vue'
import UserHistory from '../views/HistoryPage.vue'

const routes = [
  {
    path: '',
    name: 'home',
    component: HomeView
  },
  {
    path:'/register',
    name:'RegisterPage',
    component:RegisterPage
  },
  {
    path:'/login',
    name:'UserLogin',
    component:LoginPage
  },
  {
    path:'/:id/user/',
    name:'UserPage',
    component:UserPage
  },
  {
    path:'/:id/user/history',
    name:'UserHistory',
    component:UserHistory,
    props:true
  }
  
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

>>>>>>> a09a68ea8dfed890562f7050b1354fefe75e7213
export default router