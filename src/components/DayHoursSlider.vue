<template>
  <v-range-slider
    v-model="openingHours"
    max="24"
    min="0"
    step="1"
    strict
    thumb-label="always"
    class="mt-4"
  >
    <template v-slot:prepend>
      <p style="width: 70px">{{ getFirstThreeLetters(props.label) }}</p>
    </template>
  </v-range-slider>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['modelValue', 'label'])
const emit = defineEmits(['update:modelValue'])

const openingHours = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

/**
 * Returns the first three letters of a string, with the first letter capitalized.
 * @param {string} str - The input string.
 * @returns {string} - The first three letters of the input string, with the first letter capitalized.
 *                    If the input string is falsy (e.g. null, undefined, or an empty string), returns an empty string.
 */
function getFirstThreeLetters(str) {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1, 3)
}
</script>
