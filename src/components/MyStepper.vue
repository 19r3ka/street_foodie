<template>
  <v-card>
    <v-card-title class="py-4">
      <slot name="header"></slot>
    </v-card-title>

    <v-card-text class="pt-2">
      <v-window v-model="step">
        <slot></slot>
      </v-window>
    </v-card-text>

    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const step = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
