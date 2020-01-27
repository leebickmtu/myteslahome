<template>
  <div class="text-center">
    <div class="home-panel">
      <template v-for="category of serviceCategories">
        <template v-if="filterServicesByCategory(category).length">
          <div class="category-label" :key="category">{{category}}</div>
          <div class="category-list" :key="category">
            <a :href="service.link" v-for="service in filterServicesByCategory(category)" :key="service.key">
              <div class="app-tile">
                <img class="app-image" :src="getImgUrl(service.icon)" :alt="service.name">
              </div>
            </a>
          </div>
        </template>
      </template>
    </div>
    <div>More services can be added from the settings menu (changes will be saved)</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'HomePanel',
  computed: {
    ...mapGetters('data', ['enabledServices']),
    ...mapState('data', ['serviceCategories']),
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
    },
    filterServicesByCategory: function(category) {
      return this.enabledServices.filter(service => service.category === category)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-panel {
  display: flex;
  flex-direction: column;
  padding: 35px 100px 15px;
}
@media only screen and (max-width: 600px) {
  .home-panel {
    padding-left: 15px;
    padding-right: 15px;
  }
}
.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 20px 0;
}
.category-label {
  font-size: 1.2em;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase
}
.app-tile {
  max-width: 300px;
  height: 100%;
  padding: 35px;
}
.app-image {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
