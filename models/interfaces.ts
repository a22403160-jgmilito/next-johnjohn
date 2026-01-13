export interface Rating {
  rate: number;
  count: number;
}

export interface Produto {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: Rating;
  category: string;
}
export interface Joke{
    type: string
    setup: string
    punchline: string
    id: number
}