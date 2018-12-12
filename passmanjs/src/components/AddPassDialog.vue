<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" persistent max-width="50%">
      <v-btn slot="activator" color="green" dark>Add Pass</v-btn>

      <v-card>
        <v-card-title
          class="title deep-purple darken-4"
          color="grey darken-4"
          primary-title
        >New Password</v-card-title>

        <v-container fluid>
          <v-layout column wrap>
            <v-form>
              <v-text-field
                v-model="serviceName"
                label="Service Name"
                color="grey"
                persistent-hint
                outline
                required
              ></v-text-field>
              <v-text-field v-model="username" label="Username" color="grey" required></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="showPass ? 'visibility_off' : 'visibility'"
                :type="showPass ? 'text' : 'password'"
                label="Your Password"
                hint="Use an extremely hard password here"
                @click:append="showPass = !showPass"
                required
                color="grey"
              ></v-text-field>
            </v-form>
          </v-layout>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn color="primary" flat @click="cancel">Cancel</v-btn>
            <v-btn color="info" flat @click="createPassword">Add</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      dialog: false,
      serviceName: "",
      username: "",
      showPass: false,
      password: ""
    };
  },
  methods: {
    clear: function() {
      this.serviceName = "";
      this.username = "";
      this.password = "";
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
    }
  }
};
</script>
