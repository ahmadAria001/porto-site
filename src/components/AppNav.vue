<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import ThemeToggle from './custom/theme-toggle/ThemeToggle.vue';

defineProps({
  routes: {
    type: Array<{ name: string; path: string }>,
    required: true,
  },
})
</script>

<template>
  <NavigationMenu class="w-full flex justify-between items-center space-x-3">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger class="space-x-2 group data-[state=open]:bg-primary hover:bg-primary
        focus-within:bg-primary active:bg-primary">
          <Menu class="h-6 w-6" />
          <span>Menu</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent class="w-full">
          <NavigationMenuLink v-for="({ name, path }) in routes" :key="name" as-child
            class="hover:bg-primary hover:text-primary-foreground">
            <RouterLink :to="path">{{ name }}</RouterLink>
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
    <ThemeToggle />
  </NavigationMenu>
</template>
