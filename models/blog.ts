export interface BlogCategory {
  id: number,
  name: string,
}

export interface BlogElement {
  id: number,
  code: string,
  date: string,
  title: string,
  read?: number,
  views?: number,
  picture?: string,
  section: BlogCategory
}
