import { useState, useCallback, useEffect, RefObject } from "react";

type InitialStateType<T> = { [P in keyof T]: string };
type ReturnType<T> = { [P in keyof T]: [string, { (newValue: string): void }] };
type StateEntry<T> = {
  [P in keyof T]: [P, string];
}[keyof T];

export const useDataState = <T extends InitialStateType<T>>(
  initialState: T,
  ref: RefObject<HTMLElement>
): ReturnType<T> => {
  const [state, set] = useState(initialState);

  useEffect(() => {
    const $el = ref.current;
    if ($el) {
      const entries = Object.entries(state) as StateEntry<T>[];
      entries.forEach(([key, value]) => {
        $el.dataset[key.toString()] = value;
      });
    }
  }, [ref.current, state]);

  const genSetter = useCallback(
    <K extends keyof T>(key: K) => (newValue: string) => {
      set((prevState) => ({ ...prevState, [key]: newValue }));
    },
    []
  );

  const schema = {} as ReturnType<T>;
  const entries = Object.entries(state) as StateEntry<T>[];
  entries.forEach(([key, value]) => {
    schema[key] = [value, genSetter(key)];
  });

  return schema;
};

export default useDataState;
