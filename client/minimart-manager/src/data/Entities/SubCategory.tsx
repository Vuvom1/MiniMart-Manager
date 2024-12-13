import { Category } from "./Category";

export interface SubCategory {
  _id: string;
  name: string;
  category: Category;
}
