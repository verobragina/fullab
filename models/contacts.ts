import {SocialsElement} from "~/models/socials";

export interface AddressElement {
  id: number | string,
  name: string,
  coordinates: Array<number>,
  link: string,
}

export interface ContactsElement {
  id: string,
  title: string,
  phone: string,
  socials: SocialsElement,
  address: AddressElement,
  button: string,
}
