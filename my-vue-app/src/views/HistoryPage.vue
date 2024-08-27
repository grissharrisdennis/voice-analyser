<<<<<<< HEAD
<template>
  <nav>
    <div class="left">
      <span class="app-title">Transcribe App</span>
    </div>
    <div class="right">
      <router-link :to="{ name: 'UserPage', params: { id: this.$route.params.id } }">Dashboard</router-link>
      <button @click="logout" v-if="authStore.isAuthenticated">Logout</button>
    </div>
  </nav>
  <div class="headers">
    <div v-if="authStore.isAuthenticated">
      <h1>User History</h1>
      <div v-if="playlist">
        <ul>
          <li v-for="audio in playlist" :key="audio.id">
            <strong>Audio ID:</strong> {{ audio.id }} - <strong>Uploaded At:</strong> {{ audio.uploaded_at }}
            <textarea v-if="audio.transcription">Transcription: {{ audio.transcription.text }}</textarea>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No audio files found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'
import FileUpload from '../components/FileUpload.vue'
 

export default {
  name: 'UserHistory',
 
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore,
      router
    }
  },
  components: {
    FileUpload,
  },
  mounted() {
        this.authStore.fetchUser();
        const authStore = useAuthStore();
        authStore.fetchAudioFile(this.$route.params.id);
    },
    data() {
        return {
            playlist: useAuthStore().playlist
        }
    },
    
  methods: {
    
    async logout() {
      try {
        await this.authStore.logout(this.$router)
      } catch (error) {
        console.error('Error logging out:', error)
      }
    }
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
=======
<template>
  <nav>
    <div class="left">
      <span class="app-title">Transcribe App</span>
    </div>
    <div class="right">
      <router-link :to="{ name: 'UserPage', params: { id: this.$route.params.id } }">Dashboard</router-link>
      <button @click="logout" v-if="authStore.isAuthenticated">Logout</button>
    </div>
  </nav>
  <div class="headers">
    <div v-if="authStore.isAuthenticated">
      <h1>User History</h1>
      <div v-if="playlist">
        <ul>
          <li v-for="audio in playlist" :key="audio.id">
            <strong>Audio ID:</strong> {{ audio.id }} - <strong>Uploaded At:</strong> {{ audio.uploaded_at }}
            <textarea v-if="audio.transcription">Transcription: {{ audio.transcription.text }}</textarea>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No audio files found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'
import FileUpload from '../components/FileUpload.vue'
 

export default {
  name: 'UserHistory',
 
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore,
      router
    }
  },
  components: {
    FileUpload,
  },
  mounted() {
        this.authStore.fetchUser();
        const authStore = useAuthStore();
        authStore.fetchAudioFile(this.$route.params.id);
    },
    data() {
        return {
            playlist: useAuthStore().playlist
        }
    },
    
  methods: {
    
    async logout() {
      try {
        await this.authStore.logout(this.$router)
      } catch (error) {
        console.error('Error logging out:', error)
      }
    }
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
>>>>>>> a09a68ea8dfed890562f7050b1354fefe75e7213
  