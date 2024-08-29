<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <button class="close-btn" @click="$emit('close')">×</button>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <br>
        <br>
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username">
        </div>
 
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password">
        </div>
        <br>
        <p v-if="error" class="error-message"><small>{{ error }}</small></p>
        <button type="submit">Log In</button>
        <br><br>
        <h4>Not Registered?</h4>
        <router-link to="/register"><button class="register">Register</button></router-link>
      </form>
      
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth';

export default {
  name: 'LoginPopup',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      await this.authStore.login(this.username, this.password, this.$router);
      if (!this.authStore.isAuthenticated) {
        this.error = this.authStore.errorMessage || 'Please check your credentials.';
      } else {
        this.$emit('close');
      }
    },
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
};
</script>
  
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .popup-content {
    background: #283c86;
    padding: 20px;
    border-radius: 8px;
    height:600px;
    width: 400px;
    text-align: center;
    position: relative;
  }
  h2{
    color:white;
  }
  .signup{
    background-color: #42b983;
    text-decoration: none;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  .signup:hover {
    background-color: #367a57;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    background-color: white;
    color:#11f405;
  }
  .close-btn:hover{
    background-color: #11f405;
    color: white;
  }
  
  .register{
    background-color: #11f405;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .register:hover {
    background-color: #367a57;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color:black;
  }
  </style>
  
