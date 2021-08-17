<template>
  <div>
    <v-app>
      <v-btn
        data-cy="prepareButton"
        outlined
        v-if="!showPicker"
        color="primary"
        @click="prepareSticky()"
        >Add Sticky</v-btn
      >
      <v-color-picker
        data-cy="colorPicker"
        v-if="showPicker"
        mode="hexa"
        v-model="color"
        class="ma-2"
        hide-sliders
        hide-canvas
        hide-mode-switch
        hide-inputs
        show-swatches
      ></v-color-picker>
      <v-text-field
        data-cy="textField"
        label="text for sticky"
        v-if="showPicker"
        v-model="text"
      ></v-text-field>
      <v-btn
        data-cy="addSticky"
        outlined
        v-if="showPicker"
        color="primary"
        @click="addSticky()"
        >Add</v-btn
      >
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
const uuidv4 = require("uuid/v4");
export default Vue.extend({
  name: "AddSticky",
  mounted() {
    this.color = {
      get() {
        return this.color;
      },
      set(v) {
        this.color = v;
      },
    };
  },
  data: () => ({
    color: "#FFF",
    text: "",
  }),
  methods: {
    prepareSticky() {
      this.$store.commit("togglePicker");
    },
    addSticky() {
      this.$store.commit("increaseZIndex");
      const sticky = {
        id: uuidv4(),
        color: this.color.hex,
        text: this.text || "Default text for a new sticky",
        top: 0,
        left: 200,
        zIndex: this.zIndex,
        editMode: false,
      };
      this.text = "";
      this.$store.commit("addSticky", sticky);
      this.$store.commit("togglePicker");
    },
  },
  computed: mapState({
    showPicker: (state) => state.showPicker,
    zIndex: (state) => state.zIndex,
  }),
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-input {
  max-height: 100px;
}
</style>
