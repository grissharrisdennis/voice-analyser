<template>
  <NavBar />
  <div class="home">
  <div class="header">
     <h1>Welcome to the Transcribe App</h1>
     <br>
     <button class="transcribe-button" @click="openPopup">
       Start Transcribing
      </button>
      <LoginPopup :isOpen="isPopupOpen" @close="closePopup" />
  </div>
  </div>
</template>

<script>
import LoginPopup from '../components/LoginPopup.vue'
import NavBar from '../components/NavBar.vue';
export default {
  name: 'HomeView',
  components: {
    LoginPopup,
    NavBar,
  },
  data() {
    return {
      isPopupOpen: false,
    };
  },
  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
  },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.home{
  height: 100vh;
  width: 100%;
  position: relative;
}
.header{
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


  
  