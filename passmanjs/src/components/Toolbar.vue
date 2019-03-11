<template>
  <v-toolbar app clipped-left>
    <v-toolbar-side-icon @click="menuButton()"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title>PassMan 🛡️</v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { store } from "../store/store.js";
export default {
  name: "Toolbar",
  methods: {
    menuButton() {
      store.toggleDrawer();
    }
  }
};
</script>
