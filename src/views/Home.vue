<template>
  <div>
    <intro />
  </div>
</template>

<script>
// @ is an alias to /src
import intro from "@/components/intro.vue";
import { authComputed } from "../store/helpers.js";

export default {
  name: "Home",
  components: {
    intro
  },
  computed: {
    ...authComputed
  }
};
</script>
