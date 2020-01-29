<template>
  <v-app id="app">
    <SettingsDrawer />
    <v-content>
      <div id="url-input">
        <v-text-field v-model="customUrl" placeholder="Enter address" solo dark dense @keyup.enter="navigateToSite()"></v-text-field>
      </div>
      <div id="fullscreen-btn" class="text-center" v-if="showFullscreenButton">
        <v-btn @click="fullscreenTrick()" color="blue darken-2" dark>Go Fullscreen (car must be in park)</v-btn>
      </div>
      <HomePanel id="home-panel" />

      <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        width="300">

        <v-card color="blue darken-2" dark>
          <v-card-text>
            <div id="dialog-message">Select "Go to Site" on the next page.</div>
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import HomePanel from './components/HomePanel.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    HomePanel,
    SettingsDrawer
  },
  data: function() {
    return {
      dialog: false,
      customUrl: ''
    }
  },
  computed: {
    locationOrigin: function() {
      return window.location.origin
    },
    showFullscreenButton: function() {
      return !document.referrer.includes('youtube')
    }
  },
  methods: {
    ...mapActions('data', ['loadEnabledServiceKeys']),

    navigateToSite() {
      let parsed = this.customUrl.trim()
      if (!parsed.startsWith('http') && !parsed.startsWith('https')) {
        parsed = `http://${parsed}`
      }
      try {
        const url = new URL(parsed)
        window.location.assign(url)
      }
      catch {
        // ignore error
      }
    },
    fullscreenTrick() {
      this.dialog = true
      window.setTimeout(() => {
        this.dialog = false
        window.location.assign(`https://youtube.com/redirect?q=${this.locationOrigin}`)
      }, 5000)
    }
  },
  created: function() {
    this.loadEnabledServiceKeys()
  }
}
</script>

<style>
#app {
  color: #d2d2d2;
  background-color: black;
}
</style>

<style scoped lang="scss">
#url-input {
  margin: 20px 120px -30px;

  @media only screen and (max-width: 600px) {
    margin-left: 80px;
    margin-right: 80px;
  }
}

#fullscreen-btn {
  position: sticky;
  top: 80px;
  width:100%;
}
#home-panel {
  margin-bottom: 30px;
}
#dialog-message {
  font-weight: bold;
  font-size: 1.3em;
  color: white;
  padding: 10px;
}
</style>
