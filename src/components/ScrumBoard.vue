<template>
  <div @click="finishEdit">
    <div
      @drop="dropLink"
      @dragenter="checkDrop"
      @dragover="checkDrop"
      data-cy="droppableBoard"
    >
      <div
        draggable="true"
        @dragstart="startDrag($event, index)"
        v-for="(data, index) in getStickies"
        :key="data.id"
      >
        <sticky
          :text="data.text"
          :editMode="data.editMode"
          :index="index"
          class="mb-2 card"
          :style="styles(data)"
        >
        </sticky>
      </div>
      <div class="d-flex flex-row mb-6">
        <add-sticky></add-sticky>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, Store } from "vuex";
import AddSticky from "./AddSticky.vue";
import Sticky from "./Sticky.vue";

export default Vue.extend({
  name: "ScrumBoard",
  components: { AddSticky, Sticky },

  methods: {
    finishEdit(e) {
      if (e.target.className === "cardText") return;
      if (e.target.className !== "mb-2 card" && e.target.nodeName !== "INPUT") {
        this.$store.commit("toggleEditStickyMode");
      }
    },

    startDrag(event, index) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemIndex", index);
    },
    dropLink(event) {
      const draggedItemIndex = event.dataTransfer.getData("itemIndex");
      const coord = {
        top: event.clientY - 50,
        left: event.clientX - 50,
      };
      this.reposition(draggedItemIndex, coord);
    },
    reposition(index, coord) {
      this.$store.commit("reposition", { index, coord });
    },
    checkDrop(e) {
      e.preventDefault();
    },
    styles: (data) => {
      return {
        top: data.top + "px",
        left: data.left + "px",
        "z-index": data.zIndex,
        "background-color": data.color,
      };
    },
  },
  computed: mapState({
    getStickies: (state) => {
      return state.stickies;
    },
  }),
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  width: 120px;
  height: 120px;
  border: 1px solid lightgrey;
  position: absolute;
  padding: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-family: Arial, Helvetica, sans-serif;
  word-wrap: break-word;
}
</style>
