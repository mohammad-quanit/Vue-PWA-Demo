<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Todo heading="Progressive Web Todo App" />
  </div>
</template>

<script>
import Todo from "./components/Todo.vue";

export default {
  name: "app",
  components: {
    Todo
  }
};
</script>

<style>
body {
  /* background-color: azure; */
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
