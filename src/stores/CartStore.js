import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },

  getters: {
    count() {
      return this.items.length;
    },

    isEmpty() {
      return this.count === 0;
    },

    grouped() {
      return groupBy(this.items, (item) => item.name);
    },
  },

  actions: {
    addItems(count, item) {
      count = parseInt(count);

      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
  },
});