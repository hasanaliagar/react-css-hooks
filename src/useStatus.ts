import { useState } from "react";

export const useStatus = <
  T extends object,
  K extends keyof T,
  M extends { [P in K]: string },
  S extends (state: M) => M
>(
  config: T
): [M, (cb: S) => M] => {
  const $root = document.querySelector(":root") as HTMLHtmlElement;
  const $rootStyles = getComputedStyle($root);
  const initialState: M = {} as any;
  for (const [prop, { key, value }] of Object.entries(config)) {
    const newValue = value ?? $rootStyles.getPropertyValue(key);
    // @ts-ignore
    initialState[prop] = newValue;
    $root.style.setProperty(key, newValue);
  }

  const [state, set] = useState(initialState);
  return [
    state,
    (cb) => {
      const newState = cb(state);
      for (const [prop, value] of Object.entries(newState)) {
        // @ts-ignore
        const key = config[prop].key;
        // @ts-ignore
        $root.style.setProperty(key, value);
      }
      set((state) => ({
        ...state,
        ...newState,
      }));
      return state;
    },
  ];
};

export default useStatus;
