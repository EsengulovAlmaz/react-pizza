export type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
};