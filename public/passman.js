// passman.js

Vue.component('create-todo-button', {
    data: function() {
        return {
            todoText: ''
        }
    },
    methods: {
        submitTodo: function() {
            if (this.todoText != '') {
                this.$emit('add-todo', this.todoText)
                this.todoText = ''
            }
        }
    },
    template: `
        <div class="createTodo">
            <input v-model="todoText" placeholder="Type here!">
            <button @click="submitTodo">Add Todo!</button>
        </div>
    `
})

Vue.component('delete-button', {
    template: `
        <div><button @click="$emit('delete-todos')">DELETE!</button></div>
    `
})

Vue.component('todo', {
    props: ['text'],
    template: `
        <li>    
            {{ text }}
            <button @click="$emit('remove')">Remove</button>
        </li>
    `
})

var app = new Vue({
    el: '#app',
    data: {
        message: 'Welcome to P@ssMan (WIP)',
        nextIdx: 0,
        todos: []
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
})
