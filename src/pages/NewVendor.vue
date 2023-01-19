<template>
  <v-row justify="center">
    <v-col :cols="cols">
      <my-stepper v-model="activeStep">
        <template #header>
          <v-row>
            <v-col v-for="(step, index) in steps">
              <my-stepper-step
                :completed="activeStep > index + 1"
                :step="index + 1"
                :disabled="activeStep < index + 1"
                @click="activeStep = index + 1"
                >{{ step.label }}</my-stepper-step
              >
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-btn
            prepend-icon="mdi-chevron-left"
            :disabled="activeStep === 1"
            @click="activeStep--"
            >Back</v-btn
          >
          <v-btn
            append-icon="mdi-chevron-right"
            color="success"
            :disabled="!isValidStep"
            @click="activeStep++"
            >Next</v-btn
          >
        </template>
        <v-divider></v-divider>
        <my-stepper-content
          v-for="(step, index) in steps"
          :key="index"
          :step="index + 1"
        >
          <component
            :is="step.component"
            v-model="newVendor"
            @step-validated="updateStepValidity"
            @go-to-step="goToStep"
          ></component>
        </my-stepper-content>
      </my-stepper>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useDisplay } from 'vuetify'

import MyStepper from '@/components/MyStepper.vue'
import MyStepperContent from '@/components/MyStepperContent.vue'
import MyStepperStep from '@/components/MyStepperStep.vue'
import VendorBasicInfoForm from '@/components/VendorFormBasicInfo.vue'
import VendorHoursForm from '@/components/VendorFormHours.vue'
import VendorConfirmationForm from '@/components/VendorFormConfirmation.vue'

let activeStep = ref(1)
let isValidStep = ref(false)
const steps = [
  { label: 'informations', component: VendorBasicInfoForm },
  { label: 'horaires', component: VendorHoursForm },
  { label: 'Confirmation', component: VendorConfirmationForm },
]

let newVendor = reactive({
  name: '',
  location: [0, 0],
  phone: '',
  description: '',
  hours: {
    monday: [0, 0],
    tuesday: [0, 0],
    wednesday: [0, 0],
    thursday: [0, 0],
    friday: [0, 0],
    saturday: [0, 0],
    sunday: [0, 0],
  },
  offers: [],
})

const cols = computed(() => (useDisplay().name.value === 'xs' ? 12 : 6))

/**
 * Updates the value of the `isValidStep` variable.
 * @param {Boolean} bool - The new value for `isValidStep`.
 * @return {Function} - A function that sets the value of `isValidStep` to the specified value.
 */
const updateStepValidity = (bool) => (isValidStep.value = bool)

/**
 * @function
 * @param {Number} step - The step number that the function will set as the current active step.
 * @description This function receives a step number as an argument and sets it as the current active step in the form.
 */
const goToStep = (step) => (activeStep.value = step)
</script>
