<template>
    <div class="overlay fixed top-0 right-0 w-full h-full bg-black z-10 opacity-50 overscroll-contain" @click="$emit('openCart')"></div>
    <div class="fixed top-0 right-0 w-[25%] min-h-full flex flex-column bg-gray-100 z-20 cart-container">
        <div class="cart-container px-4 py-4 min-w-full">
            <div class="title-container flex flex-row justify-between pb-4 border-b-2 border-slate-300">
                <h2 class="text-3xl uppercase">Cart</h2>
                <div v-if="cartLoaded" class="flex flex-col items-center">
                    <h3>Cart Total</h3>
                    <span class="font-bold">{{ cart.cost.totalAmount.amount }} {{ cart.cost.totalAmount.currencyCode }}</span>
                </div>
            </div>
            <div class="items-container flex flex-col pt-6 pb-4">
                <div v-if="cartLoaded" v-for="(product, index) in products" class="flex flex-col mb-10">
                    <div class="flex flex-row items-center">
                        <img :src="product.merchandise.image.url" class="max-h-[150px]"/>
                        <div class="flex flex-col product-info__container">
                            <h3>{{ product.merchandise.product.title }}</h3>
                            <span>Quantity: {{ product.quantity }}</span>
                            <span class="font-bold">Price: {{ product.merchandise.price.amount }} {{ product.merchandise.price.currencyCode }}</span>
                            <span class="font-bold">TOTAL: {{ product.merchandise.price.amount * product.quantity }} {{ product.merchandise.price.currencyCode }}</span>
                        </div>
                    </div>
                    <button v-if="product.quantity > 1" :ref="product.id[index]" class="py-2 bg-slate-600 text-white uppercase text-xs rounded-md" @click="removeItem(product, index)">Remove one item</button> 
                    <button v-else :ref="product.id[index]" class="py-2 bg-red-800 text-white uppercase text-xs rounded-md" @click="removeItem(product, index)">Remove from cart</button> 
                </div>
                <p v-else>No items added to the cart.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getProductVariantId } from "../services/products.service.ts";
import { getCartInStorage, createCart, updateCart, removeItemInCart } from "../services/cart.service.ts";

export default {
    name: "Cart",
    data() {
        return {
            cart: {},
            cartLoaded: false,
            products: [],
        };
    },
    mounted() {
        this.cart = getCartInStorage();
        if (this.cart) {
            this.cartLoaded = true;
            this.products = this.getAllProducts();
        }
    },
    methods: {
        getAllProducts() {
            const cleanedProducts = this.cart.lines.edges.map((product:object) => {
                return product.node;
            })
            return this.products = cleanedProducts;
        },
        async addToCart(product:object) {
            const productVariantId = await getProductVariantId(product.id);
            const cart:object = getCartInStorage();
            return cart ? updateCart(cart, productVariantId) : createCart(productVariantId);
        },
        async removeItem(product:object, index) {
            const button = this.$refs[product.id[index]][0];
            button.style.opacity = 0.6;
            button.innerText = "Succesfully removed!";
            setTimeout(() => {
                this.$emit('openCart');
            }, 1500);
            const cart:object = getCartInStorage();
            let quantity:Number = 0;
            cart.lines.edges.forEach(cartLine => {
                const item = cartLine.node;
                if (item.merchandise.id == product.merchandise.id) {
                    quantity = item.quantity - 1;
                    return removeItemInCart(cart, item, quantity);
                };
            });
        }
    }
}
</script>