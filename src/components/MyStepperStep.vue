<template>
  <v-btn
    :disabled="disabled"
    :prepend-icon="icon"
    :color="color"
    rounded="pill"
    variant="outlined"
  >
    <slot></slot>
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  completed: { type: Boolean, default: false },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: true },
})

const icon = computed(() =>
  props.completed ? 'mdi-check' : `mdi-numeric-${props.step}`
)
const color = computed(() => (props.completed ? 'success' : 'primary'))
</script>
