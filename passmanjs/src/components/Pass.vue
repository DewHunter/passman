<template>
  <li class="pass">
    <h2>{{ service }}</h2>
    Username: {{ username }}
    Pass: {{ password}}
  </li>
</template>

<script>
export default {
  name: "Pass",
  props: {
    service: String,
    username: String,
    password: String
  },
  data: () => {
    return {};
  },
  methods: {}
};
</script>
