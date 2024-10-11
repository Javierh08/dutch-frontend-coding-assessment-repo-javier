<template>
    <GridComponent :numberOfProducts="20"></GridComponent>
</template>

<script lang="ts">
import GridComponent from "../components/GridComponent.vue";

export default {
    name: "Collection",
    data() {
        return {};
    },
    components: {
        GridComponent
    }
}
</script>

<style></style>