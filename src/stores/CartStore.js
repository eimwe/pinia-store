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
      const grouped = groupBy(this.items, (item) => item.name);
      const sorted = Object.keys(grouped).sort();
      let inOrder = {};
      sorted.forEach((key) => (inOrder[key] = grouped[key]));
      return inOrder;
    },

    total() {
      return this.items.reduce((previousItem, currentItem) => previousItem + currentItem.price, 0);
    },
  },

  actions: {
    addItems(count, item) {
      count = parseInt(count);

      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },

    clearItem(itemName) {
      this.items = this.items.filter(item => item.name !== itemName);
    },

    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItems(count, item);
    },
  },
});