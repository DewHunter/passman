<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-dialog
        class="text-xs-center"
        v-model="storeState.showColorPickerDialog"
        persistent
        max-width="40%"
      >
        <v-card :class="`elevation-12 ${selectedColor}`">
          <v-container fuild grid-list-md>
            <v-layout row wrap justify-center>
              <v-btn
                v-for="(color, idx) in colors"
                :key="idx"
                :outline="selectedColor == color"
                @click="selectColor(color)"
                flat
                small
              >{{color}}</v-btn>
            </v-layout>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-layout align-center justify-center>
              <v-btn block @click="cancel">
                <v-icon>cancel</v-icon>
              </v-btn>
              <v-btn block color="info" @click="acceptColor">
                <v-icon>check</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { store } from "../../store/store.js";
import colors from "../../colors/colors.js";

export default {
  name: "ColorPickerDialog",
  data() {
    return {
      storeState: store.state,
      colors: colors.bgs,
      selectedColor: "bg-grey"
    };
  },
  methods: {
    selectColor(color) {
      this.selectedColor = color;
    },
    acceptColor() {
      store.chooseColor(this.selectedColor);
    },
    cancel() {
      store.closeColorPickerDialog();
    }
  }
};
</script>
