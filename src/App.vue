<script setup lang="ts"></script>

<template>
  <div id="app" class="container">
    <header />
    <main>
      <router-view />
    </main>
    <footer />
  </div>
</template>

<style lang="scss" scoped>
@import "./styles/_variables.scss";
.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  main {
    background-color: #545454;
  }
}

header {
  background-color: $dark-grey;
  width: 100%;
  height: 60px;
}

main {
  flex: 1 1 auto;
  padding: 20px;
}

footer {
  background-color: $dark-grey;
  width: 100%;
  height: 270px;
}
</style>
