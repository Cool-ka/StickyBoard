<template>
  <div @click="editSticky(index)" data-cy='sticky'>
    <span data-cy='remove' class="cardText" v-if="editMode" @click="removeSticky(index)">X</span>
    <v-text-field
    data-cy='inputText'
      class="cardText"
      v-if="editMode"
      v-model="mutableText"
    ></v-text-field>
    <span class="cardText" @click="editSticky(index)" v-if="!editMode">{{
      mutableText
    }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Sticky",
  model: {
    prop: "text",
  },
  props: ["text", "editMode", "index"],

  computed: {
    mutableText: {
      get: function() {
        return this.text;
      },

      set: function(value) {
        const index = this.index;
        this.$store.commit("updateText", { index, value });
      },
    },
  },

  methods: {
    removeSticky(index) {
      this.$store.commit("removeSticky", index);
    },
    editSticky(index) {
      this.$store.commit("toggleEditStickyMode", index);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-input {
  max-height: 100px;
}
</style>
