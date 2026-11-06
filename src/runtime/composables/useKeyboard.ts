import { ref, readonly } from "vue";
import type { KeyboardReturn } from "../../types";

const isKeyboardVisible = ref(false);
const keyboardHeight = ref(0);
let isInitialized = false;

export async function initKeyboardListeners(): Promise<void> {
  if (isInitialized || typeof window === "undefined") {
    return;
  }
  isInitialized = true;

  try {
    const { Capacitor } = await import("@capacitor/core");
    if (Capacitor?.isNativePlatform?.()) {
      const { Keyboard } = await import("@capacitor/keyboard");
      await Keyboard.addListener("keyboardWillShow", (info: { keyboardHeight: number }) => {
        isKeyboardVisible.value = true;
        keyboardHeight.value = info.keyboardHeight;
      });

      await Keyboard.addListener("keyboardWillHide", () => {
        isKeyboardVisible.value = false;
        keyboardHeight.value = 0;
      });
      return;
    }
  } catch {
    // Fallback to web visualViewport
  }

  // Web fallback using visualViewport
  if (typeof window !== "undefined" && window.visualViewport) {
    const initialHeight = window.innerHeight;
    window.visualViewport.addEventListener("resize", () => {
      if (!window.visualViewport) return;
      const currentHeight = window.visualViewport.height;
      const diff = initialHeight - currentHeight;
      if (diff > 150) {
        isKeyboardVisible.value = true;
        keyboardHeight.value = diff;
      } else {
        isKeyboardVisible.value = false;
        keyboardHeight.value = 0;
      }
    });
  }
}

export function useKeyboard(): KeyboardReturn {
  if (!isInitialized && typeof window !== "undefined") {
    initKeyboardListeners();
  }

  const hide = async () => {
    try {
      const { Capacitor } = await import("@capacitor/core");
      if (Capacitor?.isNativePlatform?.()) {
        const { Keyboard } = await import("@capacitor/keyboard");
        await Keyboard.hide();
        return;
      }
    } catch {
      // Fallback
    }

    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const show = async () => {
    try {
      const { Capacitor } = await import("@capacitor/core");
      if (Capacitor?.isNativePlatform?.()) {
        const { Keyboard } = await import("@capacitor/keyboard");
        await Keyboard.show();
      }
    } catch {
      // Fallback
    }
  };

  return {
    isVisible: readonly(isKeyboardVisible),
    height: readonly(keyboardHeight),
    hide,
    show,
  };
}
