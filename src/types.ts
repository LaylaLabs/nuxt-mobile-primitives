import type { DeepReadonly, Ref } from "vue";

export type HapticsImpactStyle = "light" | "medium" | "heavy";
export type HapticsNotificationType = "success" | "warning" | "error";

export interface HapticsReturn {
  impactLight: () => Promise<void>;
  impactMedium: () => Promise<void>;
  impactHeavy: () => Promise<void>;
  selectionChanged: () => Promise<void>;
  notification: (type?: HapticsNotificationType) => Promise<void>;
  vibrate: (durationMs?: number | number[]) => Promise<void>;
}

export interface KeyboardReturn {
  isVisible: DeepReadonly<Ref<boolean>>;
  height: DeepReadonly<Ref<number>>;
  hide: () => Promise<void>;
  show: () => Promise<void>;
}

export interface ModuleOptions {
  /**
   * Automatically optimize touchstart, touchmove, and wheel listeners as passive
   * @default true
   */
  enablePassiveOptimization?: boolean;

  /**
   * Automatically initialize keyboard listeners on client boot
   * @default true
   */
  autoInitKeyboard?: boolean;
}
