<template>
  <nav>
    <div class="left">
      <span class="app-title">Transcribe App</span>
    </div>
    <div class="right">
      <router-link v-if="authStore.isAuthenticated" :to="{ name: 'UserHistory', params: { id: authStore.user.id } }">History</router-link>
      <router-link v-if="authStore.isAuthenticated" :to="{ name: 'TranscriptDetails', params: { id: authStore.user.id } }">TranscriptDetails</router-link>
      <button @click="logout" v-if="authStore.isAuthenticated" class="glowbutton">Logout<div class="arrow-wrapper"><div class="arrow"></div></div></button>
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
.glowbutton {
  --primary-color: #ffff;
  --secondary-color: #000;
  --hover-color: #ff0000;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 10px;
  color: var(--secondary-color);
  padding: 0.2em 1em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;
}

.glowbutton .arrow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.glowbutton .arrow {
  margin-top: 1px;
  width: var(--arrow-width);
  background: var(--primary-color);
  height: var(--arrow-stroke);
  position: relative;
  transition: 0.2s;
}

.glowbutton .arrow::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: solid var(--secondary-color);
  border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: 0.2s;
  padding: 3px;
  transform: rotate(-45deg);
}

.glowbutton:hover {
  background-color: var(--hover-color);
}

.glowbutton:hover .arrow {
  background: var(--secondary-color);
}

.glowbutton:hover .arrow:before {
  right: 0;
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes box {
  0% {
    box-shadow: #27272c;
  }
  50% {
    box-shadow: 0 0 25px var(--clr);
  }
  100% {
    box-shadow: #27272c;
  }
}

</style>
