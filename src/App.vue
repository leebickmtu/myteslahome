<template>
  <div id="app">
    <HomePanel id="home-panel" />
    <div id="fullscreen-btn" v-if="showFullscreenButton">
      <a :href="`https://youtube.com/redirect?q=${myUrl}`">
        <button class="btn">Go Fullscreen (car must be in park)</button>
      </a>
    </div>
  </div>
</template>

<script>
import HomePanel from './components/HomePanel.vue'

export default {
  name: 'app',
  components: {
    HomePanel
  },
  computed: {
    myUrl: function() {
      return window.location.origin
    },
    showFullscreenButton: function() {
      return !document.referrer.includes('youtube')
    }
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
}

.btn {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>

<style scoped>
#fullscreen-btn {
  position: fixed;
  bottom: 5px;
  width:100%;
}

#home-panel {
  margin-bottom: 30px;
}
</style>
