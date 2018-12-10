<template>
    <li class="todo">
        {{ text }}
        <v-btn
            color="info"
            @click="remove">
            Done
        </v-btn>
    </li>
</template>

<script>
export default {
    name: 'Todo',
    props: {
        text: String
    },
    methods: {
        remove: function() {
            this.$emit('remove')
        }
    }
}
</script>
