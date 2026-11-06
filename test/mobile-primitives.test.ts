import { describe, it, expect, vi } from "vitest";
import { useHaptics } from "../src/runtime/composables/useHaptics";
import { useKeyboard } from "../src/runtime/composables/useKeyboard";

describe("useHaptics", () => {
  it("provides haptics triggers with web fallback", async () => {
    const haptics = useHaptics();
    expect(haptics.impactLight).toBeDefined();
    expect(haptics.impactMedium).toBeDefined();
    expect(haptics.selectionChanged).toBeDefined();
    expect(haptics.notification).toBeDefined();

    // Mock navigator.vibrate
    const vibrateMock = vi.fn();
    vi.stubGlobal("navigator", { vibrate: vibrateMock });

    await haptics.impactLight();
    expect(vibrateMock).toHaveBeenCalledWith(10);

    await haptics.selectionChanged();
    expect(vibrateMock).toHaveBeenCalledWith(15);

    vi.unstubAllGlobals();
  });
});

describe("useKeyboard", () => {
  it("provides reactive keyboard state and show/hide triggers", () => {
    const keyboard = useKeyboard();
    expect(keyboard.isVisible.value).toBe(false);
    expect(keyboard.height.value).toBe(0);
    expect(keyboard.hide).toBeDefined();
    expect(keyboard.show).toBeDefined();
  });
});
