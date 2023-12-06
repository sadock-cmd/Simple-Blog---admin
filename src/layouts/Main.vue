<script setup>
import SideNav from '../components/SideNav.vue';

</script>

<template>
    <div class="flex h-screen">
        <SideNav />
        <div class="flex-1 pt-2">
            <slot></slot>
        </div>
    </div>
</template>
