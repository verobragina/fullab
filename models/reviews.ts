export interface ReviewsCardFile {
  id: number,
  link: string,
  name: string,
}

export interface ReviewsCardElement {
  id: number,
  user: string,
  date: string,
  rating: number,
  content: string,
  files?: Array<ReviewsCardFile>,
}
