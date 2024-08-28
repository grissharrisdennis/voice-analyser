<template>
  <div>
    <!-- Navbar -->
    <nav>
      <div class="left">
        <span class="app-title">Transcribe App</span>
      </div>
      <div class="right">
        <router-link :to="{ name: 'UserPage', params: { id: this.$route.params.id } }">Dashboard</router-link>
        <button @click="logout" v-if="authStore.isAuthenticated" class="glowbutton">
          Logout
          <div class="arrow-wrapper"><div class="arrow"></div></div>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="headers">
      <div v-if="authStore.isAuthenticated">
        <h1>User History</h1>
        
        <!-- Loading Spinner -->
        <div v-if="loading" class="spinner-container">
          <div class="spinner"></div>
        </div>

        <!-- Content -->
        <div v-else>
          <div v-if="playlist.length > 0">
            <ul>
              <br>
              
              <li v-for="audio in playlist" :key="audio.id">

                <strong>Audio ID:</strong> {{ audio.id }} - 
                <strong>Uploaded At:</strong> {{ audio.uploaded_at }}
                
                <!-- Transcript Textarea -->
                <div class="transcript-container">
                  <textarea v-if="audio.transcription" ref="transcriptionBox" class="transcription-box" readonly>
                    {{ audio.transcription.text }}
                  </textarea>
                  <br>
                  <button @click="copyToClipboard(audio.transcription.text)" class="copy-button">Copy Transcript</button>
                </div>
              </li>
              

            </ul>
          </div>
          <div v-else>
            <p>No audio files found.</p>
          </div>
        </div>
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

  components: {
    FileUpload,
  },

  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore,
      router
    }
  },

  data() {
    return {
      playlist: [],
      loading: true // Initialize loading state
    }
  },

  async mounted() {
    try {
      await this.authStore.fetchUser();
      await this.authStore.fetchAudioFile(this.$route.params.id);
      this.playlist = this.authStore.playlist; // Set the playlist data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false; // Stop loading when data is fetched
    }
  },

  methods: {
    async logout() {
      try {
        await this.authStore.logout(this.$router)
      } catch (error) {
        console.error('Error logging out:', error)
      }
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Transcript copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
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
  transition: 0.2s ;
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
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of viewport */
  position: fixed; /* Position it on top of everything */
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Slightly transparent background */
  z-index: 2000; /* Ensure spinner is on top of content */
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
.transcript-container {
  margin-top: 10px;
}

.transcription-box {
  width: 700px;
  height: 200px;
  resize: none;
  margin-top: 5px;
}
.copy-button{
  display: inline-block;
  outline: 0;
  text-align: center;
  cursor: pointer;
  padding: 17px 30px;
  border: 0;
  color: #fff;
  font-size: 17.5px;
  border: 2px solid transparent;
  border-color: #000;
  color: #000;
  background: transparent;
  font-weight: 800;
  line-height: 30px;
  transition: background-color .1s ease-in-out;
}

.copy-button:hover {
  background-color: #000;
  color: #fff;
}
                
  </style>
  