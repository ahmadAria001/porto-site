<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

// Props
const props = defineProps({
  showLabel: {
    type: Boolean,
    default: false
  },
  initialTheme: {
    type: String,
    default: 'light',
    validator: (value: 'light' | 'dark') => ['light', 'dark'].includes(value)
  }
})

// Emits
const emit = defineEmits(['theme-changed'])

// Reactive state
const isDark = ref(false)
const toggleButton = ref(null)

// Computed
const currentTheme = computed(() => isDark.value ? 'dark' : 'light')

// Local storage key
const THEME_STORAGE_KEY = 'user-theme-preference'

// Initialize theme from localStorage or props
const initializeTheme = () => {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = props.initialTheme === 'dark'
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error)
    isDark.value = props.initialTheme === 'dark'
  }

  applyThemeToDocument()
}

// Apply theme to document
const applyThemeToDocument = () => {
  const root = document.documentElement
  if (isDark.value) {
    root.classList.add('dark')
    root.classList.remove('light')
  } else {
    root.classList.add('light')
    root.classList.remove('dark')
  }
}

// Save theme to localStorage
const saveThemeToStorage = (theme: 'light' | 'dark') => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error)
  }
}

// Toggle theme function
const toggleTheme = () => {
  isDark.value = !isDark.value
}

// Watch for theme changes
watch(isDark, (newValue) => {
  const theme = newValue ? 'dark' : 'light'
  applyThemeToDocument()
  saveThemeToStorage(theme)
  emit('theme-changed', { theme, isDark: newValue })
}, { immediate: false })

// Initialize on mount
onMounted(() => {
  initializeTheme()
})

// Expose methods for parent components
defineExpose({
  toggleTheme,
  currentTheme,
  isDark
})
</script>

<template>
  <div class="theme-toggle-container">
    <button ref="toggleButton" :class="[
      'theme-toggle-switch',
      isDark ? 'theme-toggle-switch--dark' : 'theme-toggle-switch--light'
    ]" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" :aria-pressed="isDark" role="switch"
      @click="toggleTheme" @keydown.enter="toggleTheme" @keydown.space.prevent="toggleTheme">
      <!-- Background track -->
      <div class="theme-toggle-track">
        <!-- Sliding indicator -->
        <div :class="[
          'theme-toggle-indicator',
          isDark ? 'theme-toggle-indicator--dark' : 'theme-toggle-indicator--light'
        ]">
          <!-- Icon container with rotation animation -->
          <div class="theme-toggle-icon-container">
            <Transition name="icon-fade" mode="out-in">
              <svg v-if="!isDark" key="sun" class="theme-toggle-icon" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
              <svg v-else key="moon" class="theme-toggle-icon" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clip-rule="evenodd" />
              </svg>
            </Transition>
          </div>
        </div>

        <!-- Background icons for visual context -->
        <div class="theme-toggle-bg-icons">
          <svg class="theme-toggle-bg-icon theme-toggle-bg-icon--sun" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
          <svg class="theme-toggle-bg-icon theme-toggle-bg-icon--moon" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </button>

    <!-- Optional label -->
    <span v-if="showLabel" class="theme-toggle-label">
      {{ isDark ? 'Dark' : 'Light' }} Theme
    </span>
  </div>
</template>
