<template>
  <Transition name="toast-fade">
    <div
      v-if="toastVisible"
      class="toast show"
      role="status"
      @click="hide"
    >
      {{ toastMessage }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toastMessage, toastVisible, hide } = useToast()
</script>
