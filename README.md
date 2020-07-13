# react-css-hooks

This hook works like useState but uses CSS variables for storing.

## Install

```sh
yarn add react-css-hooks
npm install react-css-hooks
```

## Usage

```js
import useStatus from "react-css-hooks";
const [state, $set] = useStatus({
  dark: {
    key: '--dark',
    value: '#000'
  },
  light: {
    key: '--light',
    value: '#fff'
  }
})

$set((state) => ({
  ...state,
  light: '#f0f0f0'
}))
```
