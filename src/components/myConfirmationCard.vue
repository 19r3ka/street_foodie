<template>
  <v-card>
    <v-card-title>
      <span>{{ props.label }}</span>
      <v-icon
        v-if="!!step"
        @click="goToStep(props.step)"
        class="edit-icon ml-4"
        size="x-small"
        >mdi-pencil</v-icon
      >
    </v-card-title>

    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  step: { type: Number, default: 0 },
})

const emit = defineEmits(['go-to-step'])

/**
 * Navigates to a specific step in the form
 *
 * @param {Number} step - The step to navigate to
 * @emits 'go-to-step' - Emits the step number to be passed to the parent component
 */
const goToStep = (step) => {
  if (typeof step !== 'number' && isNaN(Number(step))) {
    throw new Error('step must be a number or a string representing a number')
  }
  emit('go-to-step', step)
}
</script>
