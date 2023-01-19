<template>
  <v-text-field
    v-model="coordinates"
    label="Location *"
    required
    variant="outlined"
    :rules="locationRules"
  />

  <LMap
    ref="map"
    :center="coordinates"
    :max-zoom="maxZoom"
    :min-zoom="minZoom"
    :zoom="zoom"
    style="height: 40vh"
    @ready="onMapReady"
    @update:zoom="zoom = $event"
    @update:center="coordinates = [$event.lat, $event.lng]"
  >
    <LMarker :lat-lng="coordinates" />
    <LTileLayer :url="layerUrl" :attribution="layerAttributions" />
  </LMap>

  <template v-if="errorMessage">
    <v-alert type="error" dismissible>
      {{ errorMessage }}
    </v-alert>
  </template>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { computed, nextTick, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const layerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const layerAttributions =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

const minZoom = 2
const maxZoom = 19
let map = ref(null) // reference to the map element
let zoom = ref(18)
let errorMessage = ref(null)

const locationRules = [
  (v) => !!v || 'Location is required',
  (v) =>
    (v && /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.test(v)) ||
    "Location must be in the format 'latitude, longitude'",
]

const coordinates = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit('update:modelValue', newValue)
  },
})

/**
 * Returns the current location of the user
 *
 * @returns {Promise} Resolves with an array of latitude and longitude coordinates
 * @throws {Error} If geolocation is not supported by the browser
 */
const getCurrentLocation = async () =>
  new Promise((resolve, reject) => {
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    const useLocation = (position) => {
      const { latitude, longitude } = position.coords
      resolve([latitude, longitude])
    }

    const handleError = (e) => reject(e)

    if (!navigator.geolocation)
      reject(new Error('Geolocation is not supported by this browser.'))

    navigator.geolocation.getCurrentPosition(useLocation, handleError, options)
  })

/**
 * Sets the map's view to the user's current location and
 * stores the coordinates in the coordinates variable.
 *
 * @throws {Error} If there is an error getting the current location
 */
const onMapReady = async () => {
  try {
    coordinates.value = await getCurrentLocation()
  } catch (e) {
    errorMessage.value = e
  }

  nextTick(() => {
    map.value.leafletObject.setView(coordinates.value, maxZoom.value)
  })
}
</script>
