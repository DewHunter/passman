<template>
  <v-footer app class="pa-3">
    <v-spacer></v-spacer>
    <div class="footer">&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  color: #757575;
}
</style>
