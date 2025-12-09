

export type Category = 'CONFIGS' | 'PROXIES' | 'METHODS' | 'TOOLS';

export const CATEGORIES: Record<Category, string> = {
  CONFIGS: 'Hacking & Redes',
  PROXIES: 'Gobierno & Trámites',
  METHODS: 'Finanzas & Cashout',
  TOOLS: 'Varios & Físico',
};

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: Category;
  imageUrl?: string;
  features: string[];
  buyLink?: string;
}

export interface Reference {
  id: string;
  clientName: string;
  serviceName: string;
  imageUrl: string;
  date: string;
}

export interface Announcement {
  id: string;
  text: string;
  active: boolean;
  createdAt: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  description: string;
  active: boolean;
}
