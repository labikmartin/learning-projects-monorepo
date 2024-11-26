export interface Food {
  author: string;
  description: string;
  id: string;
  image: string;
  instructions: string;
  slug: string;
  title: string;
}

export type FoodFormData = Omit<Food, 'slug'> & {
  image: File;
};
