import React, { useRef } from "react";
import useSelectorState from "./useSelectorState";
import DomService from "./lib/dom-service";
import { fireEvent } from "@testing-library/react";

type Props = {
  isComponentBased?: boolean;
};

const Component: React.FC<Props> = ({ isComponentBased }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const $root = isComponentBased ? componentRef : undefined;
  const {
    bg: [bg, setBg],
    color: [color, setColor],
  } = useSelectorState(
    {
      bg: {
        key: "--background-color",
        value: "red",
      },
      color: "--color",
    },
    $root
  );
  return (
    <div id="component" ref={componentRef}>
      <div id="vars">
        {bg} &amp; {color}
      </div>
      <button id="changeBg" onClick={() => setBg("blue")} />
      <button id="changeColor" onClick={() => setColor("white")} />
    </div>
  );
};

Component.defaultProps = {
  isComponentBased: false,
};

describe("useSelectorState", () => {
  let $root: HTMLElement;
  const getPropertyValue = (prop: string) => $root.style.getPropertyValue(prop);

  it("root element is HTML", () => {
    $root = document.querySelector(":root") as HTMLHtmlElement;
    const component = <Component />;
    const service = new DomService(component);
    const changeBg = service.getById("changeBg");
    const changeColor = service.getById("changeColor");
    const vars = service.getById("vars");
    expect(vars.innerHTML).toBe("red &amp; ");
    expect(getPropertyValue("--background-color")).toBe("red");
    expect(getPropertyValue("--color")).toBe("");
    fireEvent.click(changeBg);
    fireEvent.click(changeColor);
    expect(vars.innerHTML).toBe("blue &amp; white");
    expect(getPropertyValue("--background-color")).toBe("blue");
    expect(getPropertyValue("--color")).toBe("white");
  });

  it("root element is component", () => {
    const component = <Component isComponentBased />;
    const service = new DomService(component);
    $root = service.getById("component");
    const changeBg = service.getById("changeBg");
    const changeColor = service.getById("changeColor");
    const vars = service.getById("vars");
    expect(vars.innerHTML).toBe("red &amp; ");
    expect(getPropertyValue("--background-color")).toBe("red");
    expect(getPropertyValue("--color")).toBe("");
    fireEvent.click(changeBg);
    fireEvent.click(changeColor);
    expect(vars.innerHTML).toBe("blue &amp; white");
    expect(getPropertyValue("--background-color")).toBe("blue");
    expect(getPropertyValue("--color")).toBe("white");
  });
});
