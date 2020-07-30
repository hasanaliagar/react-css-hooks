import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

type BreakpointConfig = {
  [P in Breakpoint]: number;
};

const defaultBreakpointConfig: Omit<BreakpointConfig, "xs"> = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const getBreakPoint = (config: Omit<BreakpointConfig, "xs">): Breakpoint => {
  const windowWidth = window.innerWidth;
  if (windowWidth < config.sm) {
    return "xs";
  }
  if (windowWidth < config.md) {
    return "sm";
  }
  if (windowWidth < config.lg) {
    return "md";
  }
  if (windowWidth < config.xl) {
    return "lg";
  }
  return "xl";
};

type ReturnType = [Breakpoint, { (...screens: Breakpoint[]): Boolean }];

export const useMediaQuery = (config = defaultBreakpointConfig): ReturnType => {
  const initialState = getBreakPoint(config);
  const [state, setState] = useState(initialState);

  const onScreen = (...screens: Breakpoint[]) => {
    return screens.includes(state);
  };

  const onResize = () => {
    const breakpoint = getBreakPoint(config);
    setState(breakpoint);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return [state, onScreen];
};

export default useMediaQuery;
