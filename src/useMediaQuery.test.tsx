import React from "react";
import useMediaQuery from "./useMediaQuery";
import DomService from "./lib/dom-service";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

const Component: React.FC = () => {
  const [breakpoint, onScreen] = useMediaQuery();

  let breakpointRangeContent = "";
  if (onScreen("xl", "lg")) {
    breakpointRangeContent = "xl, lg";
  } else if (onScreen("md", "sm")) {
    breakpointRangeContent = "md, sm";
  } else {
    breakpointRangeContent = "xs";
  }

  return (
    <div>
      <h1 id="breakpoint">{breakpoint}</h1>
      <div id="breakpoint-range">{breakpointRangeContent}</div>
    </div>
  );
};

describe("useMediaQuery", () => {
  let breakpoint: HTMLHeadElement;
  let breakpointRange: HTMLDivElement;

  beforeEach(() => {
    const component = <Component />;
    const service = new DomService(component);
    breakpoint = service.getById("breakpoint");
    breakpointRange = service.getById("breakpoint-range");
  });

  it("is on the xs screen", () => {
    act(() => {
      global.innerWidth = 360;
      fireEvent(window, new Event("resize"));
    });
    expect(breakpoint.textContent).toBe("xs");
    expect(breakpointRange.textContent).toBe("xs");
  });

  it("is on the sm screen", () => {
    act(() => {
      global.innerWidth = 580;
      fireEvent(window, new Event("resize"));
    });
    expect(breakpoint.textContent).toBe("sm");
    expect(breakpointRange.textContent).toBe("md, sm");
  });

  it("is on the md screen", () => {
    act(() => {
      global.innerWidth = 780;
      fireEvent(window, new Event("resize"));
    });
    expect(breakpoint.textContent).toBe("md");
    expect(breakpointRange.textContent).toBe("md, sm");
  });

  it("is on the lg screen", () => {
    act(() => {
      global.innerWidth = 1020;
      fireEvent(window, new Event("resize"));
    });
    expect(breakpoint.textContent).toBe("lg");
    expect(breakpointRange.textContent).toBe("xl, lg");
  });

  it("is on the xl screen", () => {
    act(() => {
      global.innerWidth = 1920;
      fireEvent(window, new Event("resize"));
    });
    expect(breakpoint.textContent).toBe("xl");
    expect(breakpointRange.textContent).toBe("xl, lg");
  });
});
