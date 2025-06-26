<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="slide-fade">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </Transition>
  </RouterView>
</template>
