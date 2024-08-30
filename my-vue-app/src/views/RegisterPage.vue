<template>
  <NavBar></NavBar>
  <div class="login-dark">
    <form @submit.prevent="signup">
      <br>
      <h5>Register</h5>
      <br>
      <br>
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" placeholder="Enter your username">
      </div>
      <br>
      <br>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email">
      </div>
      <br>
      <br>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password">
      </div>
      <br>
      <button type="submit">Register</button>
      <br>
      <br>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth'; // Import the store
import NavBar from '../components/NavBar.vue';

export default {
  name: 'RegisterPage',
  components: {
    NavBar,
  },
  data() {
    return {
      username: '',
      password: '',
      email: '',
    };
  },
  methods: {
    async signup() {
      const authStore = useAuthStore(); // Access the auth store

      try {
        // Ensure CSRF token is set before making the registration request
        await authStore.setCsrfToken();

        const response = await fetch('http://localhost:8000/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          }),
          credentials: 'include'
        });

        const data = await response.json();
        console.log(response);

        if (response.ok) {
          this.success = 'Registration successful! Please log in.';
          setTimeout(() => {
            this.$router.push('/login');
          }, 1000);
        } else {
          this.error = data.error || 'Registration failed';
        }
      } catch (err) {
        this.error = 'An error occurred during registration: ' + err;
      }
    }
  }
}
</script>
  
  <style scoped>
   .login-dark {
    height:800px;
    background-color: #282c34;
    padding: 15px;
    background-size: contain;
    
  }
  .login-dark form {
    width: 500px;
    height:600px;
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
    }
  
    button[type="submit"]:hover{
      background-color:#367a57;
    }
     
  </style>
