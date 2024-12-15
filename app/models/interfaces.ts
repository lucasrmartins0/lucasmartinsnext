
export interface Category {
    name: string;
  }
  
  export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: Category;
    image: string;
    rating: Rating;
  }
  