<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <amplify-authenticator></amplify-authenticator>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";

AmplifyEventBus.$on("authState", info => {
  if (info == "signedIn") {
    window.location.href = "/welcome.html";
  }
});

export default {
  name: "Login"
};
</script>
