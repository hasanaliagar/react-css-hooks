# react-css-hooks

This hook works like useState but uses CSS variables for storing.

## Install

```sh
yarn add react-css-hooks
npm install react-css-hooks
```

### Usage (useDataState)

```js
import React, { useRef } from "react";
import { useDataState } from "react-css-hooks";

const formDataRef = useRef(null);
const data = { name: "Hasan Ali", age: "27" };

const {
  name: [name, setName],
  age: [age, setAge],
} = useDataState(data, formDataRef);

setName("Serkan");
setAge("33");
```

### Usage (useMediaQuery)

```js
import React from "react";
import { useMediaQuery } from "react-css-hooks";

const [breakpoint, onScreen] = useMediaQuery();

if (onScreen("xl", "lg")) {
  // The screen size is between xl and lg
}

// Current breakpoint (xs, sm, md, lg, xl)
console.log(breakpoint);
```

### Usage (useSelectorState)

```js
import React from "react";
import { useSelectorState } from "react-css-hooks";

const cssVars = {
  color: "--color", // The value of the variable comes from CSS
  bg: {
    key: "--background-color",
    value: "red",
  },
};

const {
  bg: [bg, setBg],
  color: [color, setColor],
} = useSelectorState(cssVars);

setBg("blue");
setColor("white");
```
