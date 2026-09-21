import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True only after client-side hydration — for content that must match the
 * server render on first paint (e.g. a theme-dependent icon). Implemented
 * with useSyncExternalStore instead of a mount-flag effect, which avoids an
 * extra synchronous setState-in-effect render. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
