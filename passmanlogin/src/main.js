import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";

import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);

Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  render: h => h(App)
}).$mount("#app");
