export type Sort = {
  name?: string;
  sortProperty?: "rating" | "price" | "title";
};

export interface FilterSliceState {
  categoryId: number;
  sort: Sort;
};