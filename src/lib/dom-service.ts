import {
  RenderResult,
  queryByAttribute,
  render,
  queryAllByAttribute,
} from "@testing-library/react";

export default class DomService {
  private dom: RenderResult;
  private _getById = queryByAttribute.bind(null, "id");
  private _getByClassName = queryAllByAttribute.bind(null, "class");

  constructor(component: JSX.Element) {
    this.dom = render(component);
  }

  getById<T extends HTMLElement>(id: string) {
    return this._getById(this.dom.container, id) as T;
  }

  getByClassName<T extends HTMLElement>(className: string) {
    return this._getByClassName(this.dom.container, className) as T[];
  }
}
