import {CollapseElement} from "~/models/collapse";

export interface FaqElement {
  id: string,
  title: string,
  list: Array<CollapseElement>
}
