<template>
  <div id="app">
    <scrum-board></scrum-board>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ScrumBoard from "./components/ScrumBoard.vue";

export default Vue.extend({
  name: "App",

  components: {
    ScrumBoard,
  },

  data: () => ({}),
  mounted() {
    if (localStorage.getItem("stickies")) {
      try {
        this.$store.commit("initializeStickies");
      } catch (e) {
        localStorage.removeItem("stickies");
      }
    }
  },
});
</script>

<style lang="scss">
.v-application--wrap {
  max-width: 10%;
  padding-right: 15px;
  padding-left: 15px;
  border-right: 1px solid lightgrey;
  justify-content: center;
}
</style>
