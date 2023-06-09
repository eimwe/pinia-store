import { defineStore, acceptHMRUpdate } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  // delete or set to 'false' to disable undo/redo history
  historyEnabled: true,

  state: () => {
    return {
      items: useLocalStorage("CartStore:items", []),
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

    clearCart() {
      this.items = [];
    },

    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItems(count, item);
    },

    checkout() {
      const authUserStore = useAuthUserStore();
      alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}