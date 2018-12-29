<template>
  <v-app dark>
    <v-content>
      <v-container fluid fill-height fill-width>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-text>Welcome!
                <PassMan/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PassMan from "./components/PassMan";

export default {
  name: "App",
  components: {
    PassMan
  }
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
