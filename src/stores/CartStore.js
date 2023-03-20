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

    total() {
      return this.items.reduce((previousItem, currentItem) => previousItem + currentItem.price, 0);
    }
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