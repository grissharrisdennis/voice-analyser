import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import UserPage from '../views/UserPage.vue'
import UserHistory from '../views/HistoryPage.vue'
import TranscriptDetails from '../views/TranscriptDetails.vue'

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
  },
  {
    path:'/:id/user/transcriptdetails',
    name:'TranscriptDetails',
    component:TranscriptDetails,
    props:true
  }
  
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router