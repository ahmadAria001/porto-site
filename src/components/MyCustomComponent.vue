<script setup lang="ts">
import { Button } from '@/components/ui/button'

defineProps({
  msg: {
    type: String,
    required: true
  },
  callback: {
    type: Function,
    required: true
  }
})
</script>
<template>
  <div>
    <h1>{{ msg }}</h1>
    <Button variant="default" class="bg-primary" @click="callback('Walawe')">This is a custom
      component</Button>
  </div>
</template>
