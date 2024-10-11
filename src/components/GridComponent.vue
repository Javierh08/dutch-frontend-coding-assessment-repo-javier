<template>
    <div class="grid grid-cols-4 gap-x-4 gap-y-8">
        <div class="flex flex-col" v-for="(product, index) in products" :key="product.id + index">
            <img :src="product.featuredImage.url" />
            <div class="flex flex-row justify-between py-4 product-info__container">
                <h2>{{ product.title }}</h2>
                <span class="font-bold">{{ product.variants.edges[0].node.price.amount }} {{ product.variants.edges[0].node.price.currencyCode }}</span> 
            </div>
            <button :ref="product.id[index]" class="py-2.5 bg-slate-600 text-white uppercase text-sm rounded-md" @click="addToCart(product, index)">Add to Cart</button>  
        </div>
    </div>
</template>

<script lang="ts">
import { getProducts, getProductVariantId } from "../services/products.service.ts";
import { getCartInStorage, createCart, updateCart } from "../services/cart.service.ts";

export default {
    name: "GridComponent",
    data(){
        return {
            products: []
        };
    },
    props: {
        numberOfProducts: {
            type: Number,
            default: 20
        }
    },
    mounted() {
        this.getAllProducts(this.numberOfProducts);
    },
    methods: {
       async getAllProducts(numberOfProducts) {
            const response = await getProducts(numberOfProducts);
            const cleanedProducts = response.products.edges.map((product:object) => {
                return product.node;
            })
            this.products = cleanedProducts;
        },
        async addToCart(product:object, index) {
            const button = this.$refs[product.id[index]][0];
            button.style.opacity = 0.6;
            button.innerText = "Succesfully added!";
            setTimeout(() => {
                button.style.opacity = 1;
                button.innerText = 'Add to Cart';
            }, 1500);
            const productVariantId = await getProductVariantId(product.id);
            const cart:object = getCartInStorage();
            return cart ? updateCart(cart, productVariantId) : createCart(productVariantId);
        }
    }
}
</script>

<style></style>