import {
  defineNuxtModule,
  addImportsDir,
  addPlugin,
  createResolver,
} from "@nuxt/kit";
import type { ModuleOptions } from "./types";

export type * from "./types";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@laylalabs/nuxt-mobile-primitives",
    configKey: "mobilePrimitives",
    compatibility: {
      nuxt: ">=3.0.0 || >=4.0.0",
    },
  },
  defaults: {
    enablePassiveOptimization: true,
    autoInitKeyboard: true,
  },
  setup(options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    // Auto-import useHaptics and useKeyboard
    addImportsDir(resolver.resolve("./runtime/composables"));

    // Register passive listener optimization plugin if enabled
    if (options.enablePassiveOptimization) {
      addPlugin({
        src: resolver.resolve("./runtime/plugins/passive-listeners.client"),
        mode: "client",
      });
    }
  },
});

declare module "@nuxt/schema" {
  interface NuxtConfig {
    mobilePrimitives?: Partial<ModuleOptions>;
  }
  interface NuxtOptions {
    mobilePrimitives?: ModuleOptions;
  }
}
