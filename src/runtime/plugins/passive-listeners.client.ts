import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin(() => {
  if (typeof window === "undefined") return;

  const supportsPassive = (() => {
    let support = false;
    try {
      const opts = Object.defineProperty({}, "passive", {
        get() {
          support = true;
        },
      });
      window.addEventListener("test", null as unknown as EventListener, opts);
      window.removeEventListener("test", null as unknown as EventListener, opts);
    } catch {
      support = false;
    }
    return support;
  })();

  if (supportsPassive) {
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      const passiveEvents = ["touchstart", "touchmove", "wheel", "mousewheel"];

      let useCapture = false;
      let passive = false;

      if (typeof options === "object" && options !== null) {
        useCapture = options.capture || false;
        passive = options.passive !== undefined ? options.passive : false;
      } else if (typeof options === "boolean") {
        useCapture = options;
      }

      if (passiveEvents.includes(type) && typeof options !== "object") {
        options = {
          capture: useCapture,
          passive: true,
        };
      } else if (
        passiveEvents.includes(type) &&
        typeof options === "object" &&
        options.passive === undefined
      ) {
        options.passive = true;
      }

      return originalAddEventListener.call(this, type, listener, options);
    };
  }
});
