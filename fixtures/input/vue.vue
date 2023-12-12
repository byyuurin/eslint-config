<template>
  <div>
    <h1>
      {{ greeting }}</h1>
    <button @click="incrementCounter">Click me!</button>
    <p>Counter: {{ counter  }}</p>
    <!-- void element -->
    <img  src='https://picsum.photos/200/300' alt="image"
                 >
    <!--normal element -->
    <div />
  </div>
</template>

<script setup>
// Define reactive data and props
import { ref  } from '@vue/reactivity';

const greeting = ref('Hello, Vue 3!' + 1);
let counter = ref(0)

// Define a function
const incrementCounter = () => {
  counter.value++;
};
</script>
