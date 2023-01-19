<template>
  <v-autocomplete
    v-model="offers"
    v-model:search="newFoodType"
    :items="foodTypes"
    variant="outlined"
    label="Foods available*"
    placeholder="Search for food type here"
    chips
    closable-chips
    clearable
    multiple
    required
  >
    <template v-slot:no-data>
      <v-alert type="info" variant="tonal" density="compact">
        <div class="d-flex flex-row align-center justify-space-between">
          <p class="mr-3">
            Your search yielded no result in our databases. Feel free to add it
            as a new food type.
          </p>

          <v-btn color="info" variant="outlined" @click="addFoodType">
            Add
          </v-btn>
        </div>
      </v-alert>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const foodTypes = ref([
  'Akoume',
  'Ablo',
  'Akpan',
  'Ayimolou',
  'Brochettes',
  'Djenkoume',
  'Fufu',
  'Gawou',
  'Kom',
  'Pinon',
  'Poisson braisé',
  'Poulet braisé',
  'Sauce arachide',
  'Sauce de noix de palme',
  'Sauce épinard',
  'Sauce feuille',
])

const props = defineProps(['modelValue'])
const emit = defineEmits(['step-validated', 'update:modelValue'])

const offers = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

let newFoodType = ref('')

/**
 * Adds a new food type to the foodTypes and offers arrays
 * @function
 * @throws {Error} If newFoodType.value is not a string
 * @returns {undefined}
 */
const addFoodType = () => {
  if (typeof newFoodType.value !== 'string')
    throw new Error('newFoodType.value is not a string')
  foodTypes.value.push(newFoodType.value)
  offers.value.push(newFoodType.value)
  newFoodType.value = ''
}
</script>
