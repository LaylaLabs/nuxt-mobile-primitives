# @laylalabs/nuxt-mobile-primitives

[![npm version](https://img.shields.io/npm/v/@laylalabs/nuxt-mobile-primitives.svg)](https://npmjs.org/package/@laylalabs/nuxt-mobile-primitives)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Essential low-level mobile primitives and ergonomic UX utilities for Nuxt 3/4 and Capacitor: tactile haptics, software keyboard height tracking, and passive event performance optimization.

## Features

- 📳 **Resilient Haptics**: Light, Medium, Heavy impact and Notification patterns with automatic web vibration fallbacks.
- ⌨️ **Software Keyboard Tracking**: Reactively track `isVisible` and `height` without keyboard layout overlap.
- ⚡ **Passive Event Optimizations**: Automatically patches `touchstart`, `touchmove`, and `wheel` to passive for 60fps scrolling.

## Installation

```bash
pnpm add @laylalabs/nuxt-mobile-primitives
```

Add to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    '@laylalabs/nuxt-mobile-primitives',
  ],
})
```

## Usage

### Tactile Haptics

```vue
<script setup lang="ts">
const { impactLight, notification } = useHaptics()

async function onButtonTap() {
  await impactLight()
}

async function onSaved() {
  await notification('success')
}
</script>
```

### Keyboard Height Tracking

```vue
<template>
  <div :style="{ paddingBottom: `${height}px` }">
    <button v-if="!isVisible" class="fixed bottom-4 right-4">
      Floating Action
    </button>
  </div>
</template>

<script setup lang="ts">
const { isVisible, height } = useKeyboard()
</script>
```

## License

MIT © [LaylaLabs](https://github.com/LaylaLabs)
