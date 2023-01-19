<template>
  <v-form ref="form" v-model="isValidForm" lazy-validation>
    <v-container>
      <p>
        Move the slider to adjust opening and closing hours. '0' for both means
        the vendor is closed on that given day.
      </p>
      <template v-for="day in daysOfTheWeek" :key="day">
        <day-hours-slider
          v-model="formData.hours[day]"
          :label="day"
        ></day-hours-slider>
      </template>
    </v-container>
  </v-form>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import DayHoursSlider from '@/components/DayHoursSlider.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['step-validated', 'update:modelValue'])

const formData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const form = ref(null)
let isValidForm = ref(true)
const daysOfTheWeek = Object.keys(formData.value.hours)

watch(isValidForm, (val) => emit('step-validated', val))
</script>
