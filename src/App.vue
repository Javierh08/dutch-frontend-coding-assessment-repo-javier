<template>
  <Header @open-cart="openCart()"></Header>
  <Cart @open-cart="openCart()" v-if="cartOpen"></Cart>
  <div class="container mx-auto pb-8 bg-gray-100 min-h-screen text-center">
    <RouterView></RouterView>
  </div>
</template> 

<script lang="ts">
import Header from "./components/Header.vue";
import Cart from "./components/Cart.vue";

export default {
  name: "App",
  data() {
    return {
      cartOpen: false
    }
  },
  components: {
    Header,
    Cart
  },   
  methods: {
    openCart() {
        this.cartOpen = this.cartOpen ? false : true;
      }
  }
};
</script>

<style scoped>
</style>
