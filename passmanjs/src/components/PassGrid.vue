<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap align-baseline>
      <Pass
        v-for="(pass, idx) in storeState.passes"
        :key="idx"
        :passId="idx"
        :bgColor="pass.bgColor"
        :service="pass.service"
        :username="pass.username"
        :password="pass.password"
      ></Pass>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../store/store.js";
import Pass from "./Pass";

export default {
  name: "PassGrid",
  components: {
    Pass
  },
  data() {
    return {
      storeState: store.state
    };
  }
};
</script>
