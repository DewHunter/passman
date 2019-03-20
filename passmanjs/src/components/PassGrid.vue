<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap align-baseline>
      <Pass
        v-for="(pass) in storeState.passes"
        :key="pass.idx"
        :passId="pass.idx"
        :bgColor="pass.bgColor"
        :service="pass.service"
        :username="pass.username"
        :password="pass.password"
      />
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
