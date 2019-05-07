<template>
  <v-navigation-drawer v-model="storeState.drawer" app clipped width="200">
    <v-list class="pa-1">
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBun&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Diamond&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Brown"
          ></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list class="pt-0" dense>
      <v-divider light></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" @click="item.action()" ripple>
        <v-list-tile-action>
          <v-icon large :color="item.iconColor">{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <div class="pa-2">
        <amplify-sign-out v-bind:signOutConfig="signOutConfig"></amplify-sign-out>
      </div>
      <div class="pa-2">
        <v-btn block @click="showStuff">show</v-btn>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { store } from "../store/store.js";
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";

AmplifyEventBus.$on("authState", info => {
  if (info == "signedOut") {
    window.location.href = "http://google.com";
  }
});

export default {
  name: "NavDrawer",
  data: function() {
    return {
      name: "Jorge Ramos",
      storeState: store.state,
      items: [
        {
          title: "New password",
          icon: "add",
          action() {
            store.showNewPassDialog();
          },
          iconColor: "info"
        },
        {
          title: "save to cloud!",
          icon: "backup",
          action: function() {},
          iconColor: "green"
        }
      ],
      signOutConfig: {
        msg: null,
        signOutButton: "I'm Out"
      }
    };
  },
  methods: {
    showStuff: function() {
      Auth.currentUserInfo().then(user => {
        alert(JSON.stringify(user));
        this.name = user.username;
      });
    }
  }
};
</script>
