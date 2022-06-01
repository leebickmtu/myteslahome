<template>
  <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :fullscreen="smAndDown"
      :style="{maxWidth: (smAndDown ? null : '60%')}"
    >
    <template v-slot:activator="{ props }">
      <v-btn
        id="menu-btn"
        color="primary"
        icon="mdi-menu"
        position="fixed"
        size="small"
        v-bind="props"
      >
      </v-btn>
    </template>
    <v-card tile>
      <v-toolbar id="dialog-header" flat color="primary">
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>

        <template v-slot:extension>
          <v-tabs
            v-model="model"
            centered
            background-color="primary"
          >
            <v-tab
              v-for="category in serviceCategories"
              :key="category"
              :value="`tab-${category}`"
            >
              {{ category }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-card-text id="dialog-body" :style="{maxHeight: (smAndDown ? null : '60vh')}">
        <v-window v-model="model" background-color="none">
          <v-window-item
            v-for="category in serviceCategories"
            :key="category"
            :value="`tab-${category}`"
          >
            <v-list>
              <v-list-item v-for="service of filterServicesByCategory(enabledServices, category)" :key="service.key" @click="removeEnabledServiceKey(service.key)">
                <div class="checkbox checked"></div>
                {{service.name}}
              </v-list-item>
            </v-list>
            <v-list>
              <v-list-item v-for="service of filterServicesByCategory(disabledServices, category)" :key="service.key" @click="addEnabledServiceKey(service.key)">
                <div class="checkbox"></div>
                {{service.name}}
              </v-list-item>
            </v-list>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useStore } from 'vuex'

const store = useStore()
const enabledServices = computed(() => store.getters.enabledServices)
const disabledServices = computed(() => store.getters.disabledServices)
const serviceCategories = computed(() => store.state.serviceCategories)
const addEnabledServiceKey = (key) => store.dispatch('addEnabledServiceKey', key)
const removeEnabledServiceKey = (key) => store.dispatch('removeEnabledServiceKey', key)

const model = ref('')
const dialog = ref(false)
const smAndDown = useDisplay().smAndDown

function filterServicesByCategory(services, category) {
  return services.filter(service => service.category === category)
}
</script>

<style scoped>
#menu-btn {
  left: 18px;
  top: 18px;
  z-index: 1;
}
#dialog-header {
  flex-shrink: 0;
}
#dialog-body {
  height: 100%;
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
