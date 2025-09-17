<template>
  <div id="app">
    <UsersTable />
  </div>
</template>

<script setup lang="ts">
import UsersTable from './components/UsersTable.vue';
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
}
</style>