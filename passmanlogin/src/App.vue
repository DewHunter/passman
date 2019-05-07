<template>
  <v-app dark>
    <Login/>
  </v-app>
</template>

<script>
import Login from "./components/Login";
export default {
  name: "App",
  components: {
    Login
  }
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
