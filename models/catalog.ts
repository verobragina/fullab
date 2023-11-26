export interface CatalogItemFeatures {
  name: string,
  value: string
}

export interface CatalogItemElement {
  code: string,
  name: string,
  price: number,
  description: string,
  features: Array<CatalogItemFeatures>,
}

export interface CategoryElement {
  id: number,
  code: string,
  name: string,
  picture?: string,
  icon?: string
}
