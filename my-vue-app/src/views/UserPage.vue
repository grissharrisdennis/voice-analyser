<template>
  <nav>
    <div class="left">
      <span class="app-title">Transcribe App</span>
    </div>
    <div class="right">
      <!-- <router-link to="/">Home</router-link> -->
      <router-link v-if="authStore.isAuthenticated" :to="{ name: 'UserHistory', params: { id: authStore.user.id } }">History</router-link>
      <router-link to="/register" v-if="!authStore.isAuthenticated">Register</router-link>
      <button @click="logout" v-if="authStore.isAuthenticated">Logout</button>
    </div>
  </nav>
  <div class="headers">
    <div v-if="authStore.isAuthenticated">
      <h1>Welcome to the Transcribe App ,{{ authStore.user?.username }}!</h1>
      <h3>{{ playlist }}</h3>
    </div>
    <br>
   <FileUpload/>
  </div>
  </template>

<script>
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'
import FileUpload from '../components/FileUpload.vue'
export default {
  name:'UserPage',
  data() {
    return {
      playlist: null,
    };
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore, router
    }
  },
  components: {

    FileUpload,
  },
  
  methods: {
    async logout() {
      try {
        await this.authStore.logout(this.$router)
      } catch (error) {
        console.error(error)
      }
    }
  },
  async mounted() {
    await this.authStore.fetchUser()
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.headers{
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
.transcribe-button {
  font-size: 16px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.transcribe-button:hover {
  background-color: #367a57;
}


</style>
