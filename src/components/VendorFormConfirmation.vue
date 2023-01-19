<template>
  <div>
    <p class="my-4">
      Please review the information in each section and agree to the terms of
      use in order to complete the registration.
    </p>
    <my-confirmation-card
      :label="basicInfo.label"
      :step="basicInfo.step"
      @go-to-step="goToStep"
    >
      <v-table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td class="text-right">{{ vendor.name }}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td class="text-right">{{ vendor.description }}</td>
          </tr>
          <tr>
            <td>Phone number:</td>
            <td class="text-right">
              (+228) <a :href="'tel:' + vendor.phone">{{ vendor.phone }}</a>
            </td>
          </tr>
          <tr>
            <td>Location:</td>
            <td class="text-right">
              <p>Latitude: {{ vendor.location[0] }}</p>
              <p>Longitude: {{ vendor.location[1] }}</p>
            </td>
          </tr>
        </tbody>
      </v-table>
    </my-confirmation-card>

    <my-confirmation-card
      :label="openingHours.label"
      :step="openingHours.step"
      @go-to-step="goToStep"
    >
      <v-table>
        <tbody>
          <my-table-row
            v-for="(hours, day) in vendor.hours"
            :key="day"
            :hours="hours"
            :label="day"
          ></my-table-row>
        </tbody>
      </v-table>
    </my-confirmation-card>

    <my-confirmation-card :label="userAgreement.label">
      <v-form ref="agreedForm">
        <v-checkbox v-model="userAgreed" required>
          <template v-slot:label>
            <p>
              I have read and agreed to the
              <a href="#" @click.prevent="openTermsModal"> terms of use</a>
            </p>
          </template>
        </v-checkbox>
      </v-form>

      <v-dialog v-model="showTermsModal" persistent>
        <v-container>
          <v-card class="pa-3">
            <v-card-title class="mb-2">
              <h1>General Terms of Use</h1>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <article>
                <h5>
                  Welcome to our Street Vendor App. By using our service, you
                  agree to the following terms and conditions:
                </h5>
                <section>
                  1. The information you provide to us when registering as a
                  street vendor, including your name, phone number, description,
                  location, schedule, and any other information you provide, may
                  be used by us for the purposes of operating, improving, and
                  promoting our service. This includes sharing the information
                  with other users, displaying it on the app, and using it for
                  analytics, research, and other business purposes.
                </section>

                <section>
                  2. You acknowledge that the app is provided to you "as-is" and
                  that we make no representation or warranty of any kind,
                  express or implied, including but not limited to, the
                  accuracy, reliability, completeness or usefulness of any
                  information provided through the app.
                </section>

                <section>
                  3. By using the service, you agree to indemnify, defend, and
                  hold harmless the app and its affiliates, officers, agents,
                  and employees from and against any claims, actions or demands,
                  including without limitation reasonable legal and accounting
                  fees, arising out of or in any way connected with your use of
                  the service or your breach of these terms.
                </section>

                <section>
                  4. We reserve the right to modify or terminate the service for
                  any reason, without notice at any time.
                </section>

                <section>
                  5. This agreement and any disputes arising out of or relating
                  to it will be governed by the laws of the country in which the
                  app is operated without giving effect to any choice of law or
                  conflict of law provisions.
                </section>

                <section>
                  <strong>
                    By using this service, you agree to the terms of this user
                    agreement. If you do not agree to these terms, please do not
                    use the service.
                  </strong>

                  We appreciate your use of the Street Vendor App, and we look
                  forward to serving you.
                </section>
              </article>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn @click="showTermsModal = false" color="primary"
                >I have read</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-container>
      </v-dialog>
    </my-confirmation-card>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import myConfirmationCard from '@/components/myConfirmationCard.vue'
import MyTableRow from './MyOpeningHoursTableRow.vue'

const basicInfo = { label: 'Basic Infromation', step: 1 }
const openingHours = { label: 'Opening Hours', step: 2 }
const userAgreement = { label: 'Terms of use', step: 0 }

const props = defineProps(['modelValue'])
const emit = defineEmits(['go-to-step', 'update:modelValue', 'step-validated'])

const vendor = computed(() => props.modelValue)
let showTermsModal = ref(false)
let userAgreed = ref(false)

const goToStep = (step) => {
  emit('go-to-step', step)
}

const openTermsModal = () => (showTermsModal.value = true)
const emitStepValidated = (val) => emit('step-validated', val)

watch(userAgreed, emitStepValidated)
</script>
