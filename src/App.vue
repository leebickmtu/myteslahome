<template>
  <v-app id="app">
    <v-content>
      <HomePanel id="home-panel" />
      <div id="fullscreen-btn" v-if="showFullscreenButton">
        <a :href="`https://youtube.com/redirect?q=${locationOrigin}`">
          <v-btn color="secondary" dark>Go Fullscreen (car must be in park)</v-btn>
        </a>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import HomePanel from './components/HomePanel.vue'

export default {
  name: 'App',
  components: {
    HomePanel
  },
  computed: {
    locationOrigin: function() {
      return window.location.origin
    },
    showFullscreenButton: function() {
      return !document.referrer.includes('youtube')
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  background-color: black;
}
</style>

<style scoped>
#fullscreen-btn {
  position: fixed;
  bottom: 5px;
  width:100%;
  text-align: center;
}

#home-panel {
  margin-bottom: 30px;
}
</style>
