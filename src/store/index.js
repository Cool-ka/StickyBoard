import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showPicker: false,
    zIndex: 0,
    stickies: [],
  },
  mutations: {
    updateText(state, payload) {
      state.stickies[payload.index].text = payload.value;
    },
    removeSticky(state, index) {
      state.stickies[index].editMode = false;
      state.stickies.splice(index, 1);
      state.stickies.forEach((sticky) => sticky.editMode = false);
      localStorage.setItem("stickies", JSON.stringify(state.stickies));
    },
    toggleEditStickyMode(state, index) {
      if (index >= state.stickies.length) return;
      if (index !== undefined) {
        state.stickies[index].editMode = true;
      } else {
        state.stickies.map((sticky) => sticky.editMode = false);
        localStorage.setItem("stickies", JSON.stringify(state.stickies));
      }
    },
    increaseZIndex(state) {
      state.zIndex = state.zIndex + 1;
    },
    reposition(state, payload) {
      state.stickies[payload.index].top = payload.coord.top;
      state.stickies[payload.index].left = payload.coord.left;
      localStorage.setItem("stickies", JSON.stringify(state.stickies));
    },
    togglePicker(state) {
      state.showPicker = !state.showPicker;
    },
    addSticky(state, sticky) {
      state.stickies.push(sticky);
      localStorage.setItem("stickies", JSON.stringify(state.stickies));
    },
    initializeStickies(state, stickies) {
      state.stickies = JSON.parse(localStorage.getItem("stickies"));
    },
  },
  actions: {},
  modules: {},
});
