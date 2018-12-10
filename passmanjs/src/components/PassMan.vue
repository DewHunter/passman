<template>
    <div class="passman">
        <div class="header">
            <h1>{{ message }}</h1>
            <AddTodoButton
                v-on:add-todo="addTodo($event)">
            </AddTodoButton>
        </div>
        <div class="todoList">
            <ul>
                <li
                    is="todo"
                    v-for="(todo, i) in todos"
                    :key="todo.id"
                    :text="todo.text"
                    v-on:remove="todos.splice(i, 1)">
                </li>
            </ul>
        </div>
        <div class="delete-button">
            <v-btn
              color="error"
              @click="deleteTodos">
                Delete All!
            </v-btn>
        </div>
    </div>
</template>

<script>
import Todo from "./Todo";
import AddTodoButton from "./AddTodoButton";

export default {
    name: "PassMan",
    components: {
        Todo,
        AddTodoButton
    },
    data: function() {
        return {
            message: 'P@ssMan',
            nextIdx: 0,
            todos: []
        }
    },
    methods: {
        addTodo: function(todoText) {
            this.todos.push({
                text: todoText,
                id: this.nextIdx++
            })
        },
        deleteTodos: function() {
            this.todos = []
        }
    }
};
</script>

<style>
.header {
    margin: 15px;
}
</style>
