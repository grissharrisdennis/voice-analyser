<template>
  <nav>
    <div class="left">
      <span class="app-title">Transcribe App</span>
    </div>
    <div class="right">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
};
</script>

<style>
nav {
  background: #2c3e50;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.left .app-title {
  font-weight: bold;
  font-size: 24px;
  color: #42b983;
}

.right {
  display: flex;
  align-items: center;
}

.right a {
  font-weight: bold;
  text-decoration: none;
  color: #999;
  font-size: 18px;
  padding: 0 15px;
}

.right a.router-link-exact-active {
  color: #42b983;
}

.login-button {
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>

  