export interface User {
    _id: string;
    phone: string;
    name?: string;
    lastName?: string;
    email?: string;
    profileImage?: string;
    selectedCategories: Category[];
  }
  
  export interface Category {
    _id: string;
    name: string;
    image: string;
    description?: string;
  }
  