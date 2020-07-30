import React, { useRef, memo } from "react";
import { fireEvent } from "@testing-library/react";
import DomService from "./lib/dom-service";
import useDataState from "./useDataState";

type Props = {
  name: string;
  age: string;
};

const FormElement = memo<{
  label: string;
  type: string;
  keyName: string;
  value: string;
  onChange: { (newValue: string): void };
}>(
  ({ label, type, keyName, value, onChange }) => {
    return (
      <div>
        <label htmlFor="name">{label}</label>
        <input
          id={keyName}
          name={keyName}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  },
  (prev, next) => prev.value === next.value
);

FormElement.displayName = "FormElement";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Component: React.FC<Props> = ({ children, ...props }) => {
  const formDataRef = useRef<HTMLInputElement>(null);
  const {
    name: [name, setName],
    age: [age, setAge],
  } = useDataState(props, formDataRef);

  return (
    <form>
      <input id="formData" type="hidden" ref={formDataRef} />
      <FormElement
        label="Name"
        keyName="name"
        value={name}
        type="text"
        onChange={setName}
      />
      <FormElement
        label="Age"
        keyName="age"
        value={age}
        type="number"
        onChange={setAge}
      />
    </form>
  );
};

describe("useDataState", () => {
  const initialNameValue = "Hasan Ali";
  const initialAgeValue = "27";
  let nameInput: HTMLInputElement;
  let ageInput: HTMLInputElement;
  let formData: HTMLInputElement;

  beforeEach(() => {
    const component = (
      <Component name={initialNameValue} age={initialAgeValue} />
    );
    const service = new DomService(component);
    nameInput = service.getById<HTMLInputElement>("name");
    ageInput = service.getById<HTMLInputElement>("age");
    formData = service.getById<HTMLInputElement>("formData");
  });

  it("should be equal to own props", () => {
    expect(nameInput.value).toBe(initialNameValue);
    expect(ageInput.value).toBe(initialAgeValue);
    expect({ ...formData.dataset }).toEqual({
      name: initialNameValue,
      age: initialAgeValue,
    });
  });

  it("should be equal to updated values", () => {
    const newName = "Serkan";
    const newAge = "33";
    fireEvent.change(nameInput, { target: { value: newName } });
    fireEvent.change(ageInput, { target: { value: newAge } });
    expect(nameInput.value).toBe(newName);
    expect(ageInput.value).toBe(newAge);
    expect({ ...formData.dataset }).toEqual({
      name: newName,
      age: newAge,
    });
  });
});
