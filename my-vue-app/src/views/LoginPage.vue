<template>
    <NavBar></NavBar>
    <div class="login-dark">
      
    <form @submit.prevent="login">
      <br>
        <h5>Login</h5>
      <br>
      <br>
      <div class="input-group">
        <label for="username">Username</label>
        <input type="username" id="username" v-model="username" placeholder="Enter your username"  @input="resetError">
      </div>
        <br>
        <br>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password"  @input="resetError">
      </div>
        <br>
        <br>
        <br>
        <button type="submit" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        <span v-if="!isLoading">Log In</span>
        <span v-if="isLoading">Loading...</span>
      </button>
        <br>
        <br>
        <h4>Not Registered</h4>
        <button class="signup"><router-link to="/register">Sign Up</router-link></button> 
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
    
  </template>
  
  <script>
  import NavBar from '../components/NavBar.vue';
  import { useAuthStore } from '../store/auth'
  export default {
    setup() {
    const authStore = useAuthStore()
    return {
      authStore
    }
  },
    components: {
      NavBar,
    },
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
        error: "",
        isLoading: false,
      };
    },
    methods: {
      async login(){
      isLoading: true;
      await this.authStore.login(this.username, this.password, this.$router)
      isLoading: false;
      if (!this.authStore.isAuthenticated){
         this.error = this.authStore.errorMessage || 'Login failed. Please check your credentials.'
      }
    },
    resetError(){
      this.error = ""
    }
    },
  };
  
  </script>
  
  <style>
   .login-dark {
    height:800px;
    background-color: #282c34;
    padding: 15px;
    background-size: contain;
    
  }
  .login-dark form {
    width: 500px;
    height:610px;
    padding: 20px;
    position: static;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 auto;
    background: #283c86;
    position: relative;
    top: 80px;
  }
  .login-dark h5{
    color:#fff;
    font-size:40px;
  }
  .h2{
    position:relative
  }
  .input-group {
      margin-bottom: 15px;
    }
    
    .input-group label {
      display: block;
      color:#fff;
      margin-bottom: 5px;
    }
    
    .input-group input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  
    button[type="submit"] {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: none;
      background-color: #11f405;
      color: white;
      cursor: pointer;
      position: relative;
    }
      button[type='submit']:hover {
  background-color: #367a57;
}
button[type='submit']:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
button .spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
    .h4{
      color:#fff;
    }
    .signup {
      width: 70%;
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: none;
      background-color: #11f405;
      color: white;
      cursor: pointer;
      text-decoration: none;
    }
  
    .signup:hover{
      background-color:#000;
    }
  </style>
