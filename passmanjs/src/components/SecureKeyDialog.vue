<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-dialog class="text-xs-center" v-model="dialog" persistent>
        <v-btn large slot="activator" color="info" dark>DecryptMahShit!</v-btn>

        <v-card class="elevation-12">
          <v-toolbar class="deep-purple darken-4">
            <v-toolbar-title>Encryption Key</v-toolbar-title>
          </v-toolbar>

          <v-container fuild grid-list-md>
            <v-layout column>
              <v-flex>
                <v-card-text>{{ keyMessage }}</v-card-text>
              </v-flex>
              <v-flex>
                <v-form>
                  <v-text-field
                    v-model="encryptKey"
                    label="Your Encryption Key"
                    color="grey lighten-3"
                    outline
                    required
                  ></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-layout align-center justify-center>
              <!-- Testing only -->
              <v-btn color="error" @click="cancel">cancel</v-btn>
              <v-btn color="info" @click="ok">Ok</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script>
import utils from "../crypto/crypto-utils";

const keyMessageStr =
  "This is your encryption key. It should be different than your P@assman password, and should preferably be a pass-phrase, the longer the better. This is used to encrypt all your passwords before they are sent to the server for storage. You will NOT be able to see your passwords unless you set this, we will NOT keep this key, if you lose it, you will lose all your previously stored passwords. Please write it on a piece of paper and keep in a safe place.";

export default {
  name: "SecureKeyDialog",
  data: () => {
    return {
      dialog: false,
      encryptKey: "",
      keyMessage: keyMessageStr
    };
  },
  methods: {
    cancel: function() {
      this.keyMessage = utils.decrypt("fakekiylolz", this.keyMessage);
    },
    ok: function() {
      this.keyMessage = utils.encrypt("fakekeylolz", this.keyMessage);
    }
  }
};
</script>
