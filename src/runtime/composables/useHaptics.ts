import type {
  HapticsReturn,
  HapticsImpactStyle,
  HapticsNotificationType,
} from "../../types";

export function useHaptics(): HapticsReturn {
  const triggerNativeImpact = async (style: HapticsImpactStyle) => {
    try {
      const { Capacitor } = await import("@capacitor/core");
      if (Capacitor?.isNativePlatform?.()) {
        const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
        const map: Record<HapticsImpactStyle, any> = {
          light: ImpactStyle.Light,
          medium: ImpactStyle.Medium,
          heavy: ImpactStyle.Heavy,
        };
        await Haptics.impact({ style: map[style] });
        return;
      }
    } catch {
      // Fallback
    }

    // Web vibration fallback
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      const duration = style === "light" ? 10 : style === "medium" ? 20 : 35;
      navigator.vibrate(duration);
    }
  };

  const impactLight = async () => triggerNativeImpact("light");
  const impactMedium = async () => triggerNativeImpact("medium");
  const impactHeavy = async () => triggerNativeImpact("heavy");

  const selectionChanged = async () => {
    try {
      const { Capacitor } = await import("@capacitor/core");
      if (Capacitor?.isNativePlatform?.()) {
        const { Haptics } = await import("@capacitor/haptics");
        await Haptics.selectionChanged();
        return;
      }
    } catch {
      // Fallback
    }

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(15);
    }
  };

  const notification = async (type: HapticsNotificationType = "success") => {
    try {
      const { Capacitor } = await import("@capacitor/core");
      if (Capacitor?.isNativePlatform?.()) {
        const { Haptics, NotificationType } = await import("@capacitor/haptics");
        const map: Record<HapticsNotificationType, any> = {
          success: NotificationType.Success,
          warning: NotificationType.Warning,
          error: NotificationType.Error,
        };
        await Haptics.notification({ type: map[type] });
        return;
      }
    } catch {
      // Fallback
    }

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      if (type === "success") navigator.vibrate([15, 50, 20]);
      else if (type === "warning") navigator.vibrate([30, 60, 30]);
      else navigator.vibrate([50, 100, 50]);
    }
  };

  const vibrate = async (durationMs: number | number[] = 25) => {
    try {
      const { Capacitor } = await import("@capacitor/core");
      if (Capacitor?.isNativePlatform?.()) {
        const { Haptics } = await import("@capacitor/haptics");
        const dur = typeof durationMs === "number" ? durationMs : durationMs[0] || 25;
        await Haptics.vibrate({ duration: dur });
        return;
      }
    } catch {
      // Fallback
    }

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(durationMs);
    }
  };

  return {
    impactLight,
    impactMedium,
    impactHeavy,
    selectionChanged,
    notification,
    vibrate,
  };
}
