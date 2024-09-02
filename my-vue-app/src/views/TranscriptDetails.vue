<template>
  <nav>
    <div class="left">
      <span class="app-title">Transcribe App</span>
    </div>
    <div class="right">
      <router-link :to="{ name: 'UserPage', params: { id: this.$route.params.id } }">Dashboard</router-link>
      <button @click="logout" v-if="authStore.isAuthenticated" class="glowbutton">Logout<div class="arrow-wrapper"><div class="arrow"></div></div></button>
    </div>
  </nav>

  <div class="headers">
    <div v-if="authStore.isAuthenticated">
      <br>
      <h2>Transcript Details</h2>
      <br>
      <h3>Top 3 Unique Phrases by the user</h3>
      <br>

      <!-- Loading Spinner -->
      <div v-if="loading" class="spinner-container">
        <div class="spinner"></div>
      </div>

      <!-- Content -->
      <div v-else>
        <div v-if="uphrases">
          <div class="phrases-container" v-for="(phrases, index) in uphrases" :key="index">
            <div class="phrase-box" v-for="(phrase, index) in phrases" :key="index">
              <p>{{ phrase }}</p>
            </div>
          </div>
        </div>
        <br>
        <div v-if="transcriptlist">
          <ul>
            <li v-for="(transcript, index) in transcriptlist" :key="transcript.id">
              <strong>Transcript Words</strong>
              <button class="fetch" @click="fetchWords(transcript.id, index)" :disabled="transcriptLoading[index]">
                Fetch Word Frequencies
              </button>
              <!-- Loading spinner for each fetch button -->
              <div v-if="transcriptLoading[index]" class="spinner-container">
                <div class="spinner"></div>
              </div>
              <div v-if="wordsList && wordsList.length > 0">
                <br>
                <h4>Words and Frequencies</h4>
                <br>
                <div class="words-container">
                  <div v-for="(wordEntry, wordIndex) in wordsList" :key="wordIndex" class="word-box">
                    <p>{{ wordEntry.word }}: {{ wordEntry.frequency }}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No transcript files found.</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'

export default {
  name: 'TranscriptDetails',

  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore,
      router
    }
  },
  mounted() {
    this.loadData();
  },
  data() {
    return {
      transcriptlist: [],
      wordsList: [],
      uphrases: [],
      loading: true, // Loading state for overall data
      transcriptLoading: [] // Loading state for each transcript fetch
    }
  },
  methods: {
    async loadData() {
      try {
        this.loading = true; // Start loading
        await this.authStore.fetchUser();
        await this.authStore.fetchTranscriptFile(this.$route.params.id);
        await this.authStore.fetchTopUniquePhrases(this.$route.params.id);
        this.transcriptlist = this.authStore.transcriptlist;
        this.wordsList = this.authStore.wordsList;
        this.uphrases = this.authStore.uphrases;
        this.transcriptLoading = new Array(this.transcriptlist.length).fill(false); // Initialize loading states
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false; // Stop loading when data is fetched
      }
    },

    async fetchWords(transcriptId, index) {
      try {
        this.transcriptLoading[index] = true; // Start loading animation for specific transcript
        await this.authStore.fetchTranscriptWords(transcriptId);
        this.wordsList = this.authStore.wordsList; // Assign fetched data
      } catch (error) {
        console.error('Error fetching words:', error);
      } finally {
        this.transcriptLoading[index] = false; // Stop loading animation
      }
    },

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
    .phrases-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 800px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
}

.phrase-box {
    background-color: #282c34;
    color: #ffffff;
    padding: 15px;
    border-radius: 9px;
    text-align: center;
    font-size: 1em;
    font-weight: bold;
    transition: transform 0.3s ease;
}

.phrase-box:hover {
    transform: translateY(-5px);
}

.phrase-box p {
    margin: 0;
}
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fetch {
  /* Set the background color to blue */
  background-color: blue;
  /* Set the text color to white */
  color: white;
  /* Set the padding around the text to 10 pixels */
  padding: 10px;
  /* Set the border to none */
  border: none;
  /* Set the cursor to pointer when hovering over the button */
  cursor: pointer;
}

    .word-box {
      display:inline-block;
   position: relative;
   margin: 5px;
   float:left;
   width:25%;
   height:40px;
  border: 1px solid #ddd; /* Light border for the boxes */
  border-radius: 4px; /* Rounded corners */
  padding: 10px;
  background-color: #f9f9f9;
  color:#282c34; /* Light background color */
  overflow: hidden; /* Ensure content doesn't overflow */
  text-align:justify; /* Center text in the box */
}

.word-box p {
  margin: 0; /* Remove default margins */
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
    
