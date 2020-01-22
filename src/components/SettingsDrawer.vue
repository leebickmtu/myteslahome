<template>
  <v-navigation-drawer id="settings-drawer" app dark right :value="settingsOpen" @input="setSettingsOpen">
    <h1 id="drawer-label">Settings</h1>
    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="service of enabledServices" :key="service.key" @click="removeEnabledServiceKey(service.key)">
        <div class="checkbox checked"></div>
        {{service.name}}
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item v-for="service of disabledServices" :key="service.key" @click="addEnabledServiceKey(service.key)">
        <div class="checkbox"></div>
        {{service.name}}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'SettingsDrawer',
  computed: {
    ...mapGetters('data', ['enabledServices', 'disabledServices']),
    ...mapState('data', ['settingsOpen'])
  },
  methods: {
    ...mapActions('data', ['addEnabledServiceKey', 'removeEnabledServiceKey', 'setSettingsOpen'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#settings-drawer {
  color: white;
}
#drawer-label {
  margin: 6px 12px;
}
.checkbox {
  width: 19px;
  height: 19px;
  border: 2px solid white;
  border-radius: 2px;
  margin-right: 10px;
  position: relative;
}
.checkbox.checked {
  background-color: white;
}
.checkbox.checked::before {
  display: block;
  content: "";
  width: 7px;
  height: 13px;
  border-right: 2px solid rgb(80, 80, 80);
  border-bottom: 2px solid rgb(80, 80, 80);
  transform: rotate(45deg);
  position: absolute;
  left: 4px;
  top: 0px;
}
</style>
