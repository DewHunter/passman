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
          <v-icon large>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider light></v-divider>

      <!-- <v-list-tile class="pt-3">
        <v-list-tile-content>
          <SecureKeyDialog/>
        </v-list-tile-content>
      </v-list-tile>-->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { store } from "../store/store.js";

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
          }
        },
        { title: "save to cloud!", icon: "backup", action: function() {} }
      ]
    };
  }
};
</script>
