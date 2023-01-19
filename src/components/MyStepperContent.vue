<template>
  <v-window-item :value="step">
    <slot></slot>
  </v-window-item>
</template>

<script setup>
defineProps({ step: { type: Number, required: true } })
</script>
