<template>
    <div v-if="isOpen" class="popup-overlay">
      <div class="popup-content">
        <button class="close-btn" @click="$emit('close')">×</button>
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
      <br>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your username">
      </div>
        <br>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password">
      </div>
        <br>
        <button type="log-in-button" >Log In</button>
        <br>
        <br>
        <a>Not Registered<router-link to="/register">Sign Up</router-link></a> 
      </form>

      </div>
    </div>
  </template>
  
  <script>
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
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Handle login logic here
        console.log('Logging in with', this.email, this.password);
        this.$emit('close'); // Close the popup after login
      },
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
    height:550px;
    width: 400px;
    text-align: center;
    position: relative;
  }
  h2{
    color:white;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
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
  