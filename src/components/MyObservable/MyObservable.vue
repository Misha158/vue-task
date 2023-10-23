<script lang="ts" setup="">
import observable from "./ClassObservable";
function handleClick() {
  observable.notify("User clicked button!");
}

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function logger2(data) {
  console.log(`loger 2`);
}

function logger3(data) {
  console.log(`loger 3`);
}

observable.subscribe(logger);
observable.subscribe(logger2);
observable.subscribe(logger3);
</script>

<template>
  <div>
    <button v-on:click="handleClick">Click to notify observables</button>
  </div>
</template>

<style lang="scss" scoped></style>
