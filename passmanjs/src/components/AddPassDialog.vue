<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-dialog class="text-xs-center" v-model="dialog" persistent max-width="65%">
        <v-btn large slot="activator" color="green" dark>Add Pass</v-btn>

        <v-card class="elevation-12">
          <v-toolbar class="deep-purple darken-4">
            <v-toolbar-title>New Password</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip left>
              <v-btn slot="activator" icon large target="_blank" @click="showStringPassPicker">
                <v-icon meidum color="orange darken-4">dialpad</v-icon>
              </v-btn>
              <span>Need help picking a strong password?</span>
            </v-tooltip>
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
              <v-flex v-if="strongPassPickerShow" xs3>
                <v-layout column stretch>
                  <v-flex d-flex>
                    <v-textarea
                      id="genPassword"
                      outline
                      label="Generated Password"
                      v-model="suggestedPass"
                    ></v-textarea>
                  </v-flex>
                  <v-flex d-flex>
                    <v-btn block color="success" @click="useGeneratedPass">Use!</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-layout align-center justify-center>
              <v-btn color="error" @click="cancel">Cancel</v-btn>
              <v-btn color="info" @click="createPassword">Add</v-btn>
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
import C from "../constants.js";

export default {
  data: () => {
    return {
      dialog: false,
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
    clear: function() {
      this.serviceName = "";
      this.username = "";
      this.password = "";
      this.suggestedPass = "";
      this.strongPassPickerShow = false;
      this.snackbar = false;
    },
    cancel: function() {
      this.clear();
      this.dialog = false;
    },
    createPassword: function() {
      this.$emit("createPassword", {
        pass: this.password,
        service: this.serviceName,
        username: this.username
      });
      this.clear();
      this.dialog = false;
    },
    useGeneratedPass: function() {
      this.snackbar = true;
      this.showPass = true;
      this.password = this.suggestedPass;
      var copyText = document.getElementById("genPassword");
      copyText.select();
      document.execCommand("copy");
    },
    showStringPassPicker: function() {
      if (this.strongPassPickerShow) {
        this.strongPassPickerShow = false;
        this.suggestedPass = "";
      } else {
        this.strongPassPickerShow = true;
        this.suggestedPass;
        (async () => {
          let resp = await fetch(C.endpoint + "/randpassgen");
          let respJ = await resp.json();
          this.suggestedPass = respJ.pass;
        })();
      }
    }
  }
};
</script>
