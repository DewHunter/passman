<template>
    <div class="createTodo">
        <input v-model="todoText" placeholder="Type here!">
        <v-btn color="success" @click="submitTodo">Add Todo!</v-btn>
    </div>
</template>

<script>
export default {
    name: 'AddTodoButton',
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
    }
}
</script>
