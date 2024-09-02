<template>
  <NavBar />

  <div class="home">
    <div class="header">
      <div class="text-container">
        <h1>Transcribe Your Audio Easily</h1>
        <br>
        <br>
        <button class="transcribe-button" @click="openPopup">
          Transcribe Now
        </button>
      </div>
      <div class="icon-container">
        <img src="../assets/audio.jpg" alt="Transcribe Icon" class="transcribe-icon" />
      </div>
      <LoginPopup :isOpen="isPopupOpen" @close="closePopup" />
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap';
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
  mounted() {
    gsap.from('.text-container', {
      duration: 1,
      x: -200,
      opacity: 0,
      ease: 'power3.out',
    });
    
    // gsap.from('.icon-container', {
    //   duration: 1,
    //   x: 200,
    //   opacity: 0,
    //   ease: 'power3.out',
    //   delay: 0.5,
    // });
    
    gsap.from('.transcribe-button', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 1,
    });
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
.header h1{
  font-size: 45px;
}
  .text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}
.transcribe-button {
  font-size: 35px;
  padding: 20px 40px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.icon-container {
  width: 350px;
  height: 350px;
  animation: rotate 5s linear infinite;
}

.transcribe-button:hover {
  background-color: #367a57;
}


</style>


  
  
