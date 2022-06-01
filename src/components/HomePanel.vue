<template>
  <div class="text-center">
    <div class="home-panel">
      <template v-for="category of serviceCategories">
        <div :key="category" v-if="filterServicesByCategory(enabledServices, category).length">
          <div class="category-label">{{category}}</div>
          <div class="category-list">
            <a :href="service.link" v-for="service in filterServicesByCategory(enabledServices, category)" :key="service.key">
              <div class="app-tile">
                <img class="app-image" :src="getImgUrl(service.icon)" :alt="service.name">
              </div>
            </a>
          </div>
        </div>
      </template>
    </div>
    <div>More services can be added from the settings menu (changes will be saved)</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const enabledServices = computed(() => store.getters.enabledServices)
const serviceCategories = computed(() => store.state.serviceCategories)

function getImgUrl(iconPath) {
  let image = null;
  try {
    image = require(`../assets/logos/${iconPath}`)
  } catch {
    // ignore error
  }
  return image
}

function filterServicesByCategory(services, category) {
  return services.filter(service => service.category === category)
}
</script>

<style scoped lang="scss">
.home-panel {
  display: flex;
  flex-direction: column;
  padding: 35px 60px 15px;

  @media only screen and (max-width: 600px) {
    padding-left: 25px;
    padding-right: 25px;
  }
}
.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 14px 0;
}
.category-label {
  font-size: 1.2em;
  font-weight: bold;
  text-align: left;
  text-transform: capitalize
}
.app-tile {
  max-width: 240px;
  height: 100%;
  max-height: 135px;
  padding: 35px;
}
.app-image {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
