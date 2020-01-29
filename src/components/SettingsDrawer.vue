<template>
  <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      max-width="60%"
      scrollable
      persistent
      :transition="($vuetify.breakpoint.smAndDown ? 'dialog-bottom-transition' : 'dialog-transition')"
    >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        fixed
        top
        left
        fab
        small
        v-on="on"
      >
       <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>
    <v-card tile dark>
      <v-toolbar tabs dark flat color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>

        <template v-slot:extension>
          <v-tabs
            v-model="model"
            centered
            dark
            background-color="primary"
            show-arrows
          >
            <v-tab
              v-for="category in serviceCategories"
              :key="category"
              :href="`#tab-${category}`"
            >
              {{ category }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-card-text id="dialog-body" :style="{maxHeight: ($vuetify.breakpoint.smAndDown ? null : '60vh')}">
        <v-tabs-items v-model="model" dark background-color="none">
          <v-tab-item
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
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'SettingsDrawer',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: '',
    }
  },
  computed: {
    ...mapGetters('data', ['enabledServices', 'disabledServices']),
    ...mapState('data', ['serviceCategories'])
  },
  methods: {
    ...mapActions('data', ['addEnabledServiceKey', 'removeEnabledServiceKey']),

    filterServicesByCategory: function(services, category) {
      return services.filter(service => service.category === category)
    }
  }
}
</script>

<style scoped>
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
