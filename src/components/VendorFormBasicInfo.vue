<template>
  <v-form ref="form" v-model="isValidForm" lazy-validation class="pt-4">
    <v-text-field
      v-model="formData.name"
      label="Vendor Name *"
      required
      variant="outlined"
      :rules="rules.name"
    ></v-text-field>
    <v-text-field
      v-model="formData.phone"
      label="Phone Number *"
      variant="outlined"
      prefix="+228"
      :rules="[rules.phoneNumber]"
    ></v-text-field>
    <v-textarea
      v-model="formData.description"
      label="Description"
      variant="outlined"
      rows="4"
    ></v-textarea>
    <my-food-types-input v-model="formData.offers"></my-food-types-input>
    <my-location-input v-model="formData.location"></my-location-input>
  </v-form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import MyLocationInput from '@/components/MyLocationInput.vue'
import MyFoodTypesInput from '@/components/MyFoodTypesInput.vue'

const form = ref(null) // reference to the form itself
let isValidForm = ref(false)

const props = defineProps(['modelValue'])
const emit = defineEmits(['step-validated', 'update:modelValue'])

const formData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const rules = {
  name: [
    (v) => !!v || 'Name is required',
    (v) => v?.length <= 50 || 'Name must be less than 50 characters',
  ],
  required: (value) => !!value || 'This field is required',
  phoneNumber: (value) =>
    /^\d{8}$/.test(value) ||
    'Phone number must be in the format + 228 9455XXXX',
}

watch(isValidForm, (val) => emit('step-validated', val))
</script>
