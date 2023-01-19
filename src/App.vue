<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" floating app>
      <v-toolbar title="Food 2 Rue" color="white"></v-toolbar>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :value="item"
          rounded="xl"
          :to="item.linkDestination"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat collapse color="transparent  ">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { reactive, ref } from 'vue'

let drawer = ref(false)
let menuItems = reactive([
  {
    icon: 'mdi-map-marker',
    text: 'Add a vendor',
    linkDestination: { name: 'new vendor' },
  },
])
</script>
