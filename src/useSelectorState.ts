import { useState, useCallback, useEffect, RefObject } from "react";

type KeyValuePair = { key: string; value: string };

type ConfigType<T> = { [P in keyof T]: string | KeyValuePair };

type StateType<T> = { [P in keyof T]: string };

type ReturnType<T> = { [P in keyof T]: [string, { (newValue: string): void }] };

type ConfigEntry<T> = {
  [P in keyof T]: [P, string | KeyValuePair];
}[keyof T];

export const useSelectorState = <T extends ConfigType<T>>(
  config: T,
  ref?: RefObject<HTMLElement>
): ReturnType<T> => {
  let $root: HTMLElement;
  const entries = Object.entries(config) as ConfigEntry<T>[];

  const getInitialState = (): StateType<T> => {
    const initialState = {} as StateType<T>;
    entries.forEach(([prop, data]) => {
      let key: string;
      let value: string;
      if (!$root) {
        initialState[prop] = "";
      } else {
        const $styles = getComputedStyle($root);
        if (typeof data === "string") {
          key = data;
          value = $styles.getPropertyValue(data);
        } else {
          key = data.key;
          value = data.value;
        }
        initialState[prop] = value.trim();
        $root.style.setProperty(key, initialState[prop]);
      }
    });
    return initialState;
  };

  const initialState = getInitialState();
  const [state, set] = useState(initialState);

  useEffect(() => {
    $root = (ref
      ? ref.current
      : document.querySelector(":root")) as HTMLElement;
    const initialState = getInitialState();
    set(initialState);
  }, []);

  const genSetter = useCallback(
    <K extends keyof T>(key: K) => (newValue: string) => {
      set((prevState) => ({
        ...prevState,
        [key]: newValue,
      }));
      const attr = config[key];
      if (typeof attr === "string") {
        $root.style.setProperty(attr, newValue);
      } else {
        $root.style.setProperty((attr as KeyValuePair).key, newValue);
      }
    },
    []
  );

  const schema = {} as ReturnType<T>;
  entries.forEach(([key]) => {
    schema[key] = [state[key], genSetter(key)];
  });

  return schema;
};

export default useSelectorState;
