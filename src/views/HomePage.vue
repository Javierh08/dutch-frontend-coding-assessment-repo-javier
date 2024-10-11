<template>
    <h1 class="font-bold uppercase text-6xl text-center py-20">Shop Now!</h1>
    <GridComponent :numberOfProducts="4"></GridComponent>
    <button @click="this.$router.push('/collection')" class="my-20 py-6 px-10 text-3xl text-white rounded-md uppercase bg-slate-600">Click here to check more items</button>
</template>

<script lang="ts">
import GridComponent from "../components/GridComponent.vue";

export default {
    name: "HomePage",
    data(){
        return {};
    },
    components: {
        GridComponent
    }
}
</script>

<style></style>