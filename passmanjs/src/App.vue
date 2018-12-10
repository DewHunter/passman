<template>
  <v-app dark>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <PassMan/>
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
/* body {
    background-color: #424242;
    color: #9e9e9e;
} */
</style>
