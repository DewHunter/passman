<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-dialog
        class="text-xs-center"
        v-model="storeState.showNewPassDialog"
        persistent
        max-width="40%"
      >
        <v-card class="elevation-12">
          <v-toolbar class="dialog-header">
            <v-toolbar-title>New Password</v-toolbar-title>
          </v-toolbar>

          <v-container fuild grid-list-md>
            <v-layout row>
              <v-flex>
                <v-form>
                  <v-text-field
                    v-model="serviceName"
                    label="Service Name"
                    color="grey lighten-3"
                    persistent-hint
                    outline
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="person"
                    v-model="username"
                    label="Username"
                    color="grey lighten-3"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password"
                    :append-icon="showPass ? 'visibility_off' : 'visibility'"
                    :type="showPass ? 'text' : 'password'"
                    label="Your Password"
                    hint="Use an extremely hard password here"
                    @click:append="showPass = !showPass"
                    required
                    color="grey lighten-3"
                  ></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-layout align-center justify-center>
              <v-btn @click="cancel">
                <v-icon>cancel</v-icon>
              </v-btn>
              <v-btn color="info" @click="createPassword">
                <v-icon>add</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        color="info"
        v-model="snackbar"
        :bottom="true"
        :timeout="2000"
      >Password copied to Clipboard!</v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
import { store } from "../store/store.js";
const bgs = [
  "bg-red",
  "bg-pink",
  "bg-purple",
  "bg-deep-purple",
  "bg-indigo",
  "bg-blue",
  "bg-light-blue",
  "bg-cyan",
  "bg-teal",
  "bg-green",
  "bg-light-green",
  "bg-lime",
  "bg-yellow",
  "bg-amber",
  "bg-orange",
  "bg-deep-orange",
  "bg-brown",
  "bg-blue-grey",
  "bg-grey"
];

export default {
  name: "AddPassDialog",
  data() {
    return {
      storeState: store.state,
      strongPassPickerShow: false,
      serviceName: "",
      username: "",
      showPass: false,
      password: "",
      suggestedPass: "",
      snackbar: false
    };
  },
  methods: {
    clear() {
      this.serviceName = "";
      this.username = "";
      this.password = "";
      this.suggestedPass = "";
      this.strongPassPickerShow = false;
      this.snackbar = false;
    },
    cancel() {
      this.clear();
      store.closeNewPassDialog();
    },
    createPassword() {
      if (
        this.password == "" ||
        this.serviceName == "" ||
        this.username == ""
      ) {
        alert("No password entry was added!");
        store.closeNewPassDialog();
      } else {
        store.addPass({
          password: this.password,
          service: this.serviceName,
          username: this.username,
          bgColor: this.randColor()
        });
      }
      this.clear();
    },
    randColor() {
      return bgs[Math.floor(Math.random() * Math.floor(bgs.length))];
    }
  }
};
</script>

<style>
.dialog-header {
  background: linear-gradient(120deg, #311b92 0%, #5e35b1 100%);
}
</style>
