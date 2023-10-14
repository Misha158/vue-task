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
.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  main {
    background-color: #545454;
  }
}

header {
  background-color: #474747;
  width: 100%;
  height: 40px;
}

main {
  flex: 1 1 auto;
}

footer {
  background-color: #474747;
  width: 100%;
  height: 60px;
}
</style>
