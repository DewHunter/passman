<template>
  <AddPassDialog v-on:createPassword="log($event)"/>
</template>

<script>
import AddPassDialog from "./AddPassDialog";

export default {
  name: "PassMan",
  components: {
    AddPassDialog
  },
  data: function() {
    return {
      message: "P@ssMan",
      nextIdx: 0,
      todos: []
    };
  },
  methods: {
    addTodo: function(todoText) {
      this.todos.push({
        text: todoText,
        id: this.nextIdx++
      });
    },
    deleteTodos: function() {
      this.todos = [];
    }
  }
};
</script>
