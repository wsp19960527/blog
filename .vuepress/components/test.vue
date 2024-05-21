<template>
  <div class="demo-container">
    <h3 style="widht">My name is {{name}}.</h3>
    <p>This is a vue preview demo.</p>
  </div>
</template>

<script setup lang="ts">
import { useInfo } from "./demo";
import MyPromise from './promise'
const { name } = useInfo()
const MyPromiseRes = new MyPromise(() => {

})
</script>

<style>
.demo-container {
  width: 300px;
}
</style>

