<template>
  <div class="home-panel">
    <div class="app-tile" v-for="service in enabledServices" :key="service.key">
      <a :href="service.link">
        <img class="app-image" :src="getImgUrl(service.icon)" :alt="service.name">
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomePanel',
  computed: {
    ...mapGetters('data', ['enabledServices'])
  },
  methods: {
    getImgUrl: function(iconPath) {
      console.log(iconPath)
      let image = null;
      try {
        image = require(`../assets/logos/${iconPath}`)
      } catch {
        // igonre error
      }
      return image
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 50px;
}
.app-tile {
  width: 300px;
  height: 110px;
  margin: 40px;
  padding: 5px;
}
.app-image {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
