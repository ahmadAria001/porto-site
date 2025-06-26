<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>
<script lang="ts">
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
</script>
<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
      <Button variant="default" class="bg-primary">Learn Vite</Button>
    </h3>
    <Accordion type="single" collapsible>
      <AccordionItem value="item1">
        <AccordionTrigger class="bg-primary">
          <h3>Ecosystem</h3>
        </AccordionTrigger>
        <AccordionContent class="bg-primary">
          <p>See <a href="https://github.com/johnsoncodehk/volar/discussions/471" target="_blank" rel="noopener">Volar's
              FAQ</a> for advice on how to configure Vue in JavaScript projects.</p>
          <p>If you have questions about Volar specific features, such as Vue component auto-import, you can also open
            an
            issue on <a href="https://github.com/johnsoncodehk/volar/issues" target="_blank" rel="noopener">Volar's
              issue
              tracker</a>.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
