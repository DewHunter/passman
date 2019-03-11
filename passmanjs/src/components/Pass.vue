<template>
  <v-flex xs3>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover || showActions ? 24 : 0} ${bgColor}`"
      >
        <v-card-title @click="cardClick()">
          <span class="title font-weight-light">{{ service }}</span>
        </v-card-title>

        <v-card-title>
          <v-list-tile class="grow">
            <v-list-tile-avatar>
              <v-icon>account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ username }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-card-title>
        <v-divider v-if="showActions"></v-divider>
        <v-card-actions v-if="showActions" class="grow">
          <v-btn small @click="del()">
            <v-icon color="red">delete</v-icon>
          </v-btn>
          <v-btn small @click="edit()">
            <v-icon color="blue">edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>
import { store } from "../store/store.js";
export default {
  name: "Pass",
  props: {
    passId: String,
    bgColor: String,
    service: String,
    username: String,
    password: String
  },
  data() {
    return {
      showActions: false
    };
  },
  methods: {
    cardClick() {
      this.showActions = !this.showActions;
    },
    del() {
      store.deletePass(this.passId);
      this.showActions = false;
    }
  }
};
</script>

<style>
.bg-red {
  background: linear-gradient(135deg, #b71c1c 0%, #ef5350 100%);
}

.bg-pink {
  background: linear-gradient(135deg, #880e4f 0%, #ec407a 100%);
}

.bg-purple {
  background: linear-gradient(135deg, #4a148c 0%, #ab47bc 100%);
}

.bg-deep-purple {
  background: linear-gradient(135deg, #311b92 0%, #7e57c2 100%);
}

.bg-indigo {
  background: linear-gradient(135deg, #1a237e 0%, #5c6bc0 100%);
}

.bg-blue {
  background: linear-gradient(135deg, #0d47a1 0%, #42a5f5 100%);
}

.bg-light-blue {
  background: linear-gradient(135deg, #01579b 0%, #26c6da 100%);
}

.bg-cyan {
  background: linear-gradient(135deg, #006064 0%, #29b6f6 100%);
}

.bg-teal {
  background: linear-gradient(135deg, #004d40 0%, #26a69a 100%);
}

.bg-green {
  background: linear-gradient(135deg, #1b5e20 0%, #66bb6a 100%);
}

.bg-light-green {
  background: linear-gradient(135deg, #33691e 0%, #9ccc65 100%);
}

.bg-lime {
  background: linear-gradient(135deg, #827717 0%, #d4e157 100%);
}

.bg-yellow {
  background: linear-gradient(135deg, #f57f17 0%, #ffee58 100%);
}

.bg-amber {
  background: linear-gradient(135deg, #ff6f00 0%, #ffca28 100%);
}

.bg-orange {
  background: linear-gradient(135deg, #e65100 0%, #ffa726 100%);
}

.bg-deep-orange {
  background: linear-gradient(135deg, #bf360c 0%, #ff7043 100%);
}

.bg-brown {
  background: linear-gradient(135deg, #3e2723 0%, #8d6e63 100%);
}

.bg-blue-grey {
  background: linear-gradient(135deg, #263238 0%, #78909c 100%);
}

.bg-grey {
  background: linear-gradient(135deg, #212121 0%, #bdbdbd 100%);
}
</style>
