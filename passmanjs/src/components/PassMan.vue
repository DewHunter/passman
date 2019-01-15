<template>
  <div>
    <ul>
      <Pass
        v-for="(pass, idx) in passes"
        :key="idx"
        :service="pass.service"
        :username="pass.username"
        :password="pass.password"
      ></Pass>
    </ul>
    <AddPassDialog v-on:createPassword="addPass($event)"/>
    <SecureKeyDialog/>
  </div>
</template>

<script>
import SecureKeyDialog from "./SecureKeyDialog";
import AddPassDialog from "./AddPassDialog";
import Pass from "./Pass";

export default {
  name: "PassMan",
  components: {
    SecureKeyDialog,
    AddPassDialog,
    Pass
  },
  data: function() {
    return {
      message: "P@ssMan",
      nextIdx: 0,
      passes: []
    };
  },
  methods: {
    addPass: function(passData) {
      this.passes.push(passData);
    },
    deleteTodos: function() {
      this.todos = [];
    }
  }
};
</script>
