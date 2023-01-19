<template>
  <tr>
    <td class="text-capitalize">{{ label }}</td>
    <template v-if="closed">
      <td></td>
      <td class="text-uppercase text-center">closed</td>
      <td></td>
    </template>
    <template v-else-if="allDay">
      <td></td>
      <td class="text-uppercase text-center">24 hours</td>
      <td></td>
    </template>
    <template v-else>
      <td class="text-center">{{ opening }}</td>
      <td class="text-center">to</td>
      <td class="text-center">{{ closing }}</td>
    </template>
  </tr>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  hours: { type: Array, required: true },
  label: { type: String, required: true },
})

const opening = computed(() => props.hours.at(0))
const closing = computed(() => props.hours.at(1))
const closed = computed(() => opening.value === 0 && closing.value === 0)
const allDay = computed(() => opening.value === 0 && closing.value === 24)
</script>
