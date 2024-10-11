<template>
    <div class="flex flex-row justify-between py-8 px-6 bg-slate-600">
        <div class="text-white text-lg cursor-pointer uppercase" @click="$emit('openCart')">Cart</div>
        <button class="text-white text-lg cursor-pointer uppercase" @click="this.$router.push('/')">Home</button>
    </div>
</template>

<script lang="ts">

export default {
    name: "Header",
    data() {
        return {}
    }
}

</script>