export type ListingType = 'Producto' | 'Servicio';

export type Category = 'Todos' | 'Libros' | 'Tecnología' | 'Materiales' | 'Tutorías' | 'Servicios';

export type ProductCondition = 'Nuevo' | 'Usado - Como nuevo' | 'Usado - Buen estado' | 'Usado - Aceptable';

export type ServiceMode = 'Por hora' | 'Por asesoría' | 'Por proyecto' | 'A convenir';

export interface ListingItem {
  id: string;
  title: string;
  type: ListingType;
  category: Exclude<Category, 'Todos'>;
  price: number;
  condition?: ProductCondition;
  serviceMode?: ServiceMode;
  description: string;
  sellerName: string;
  sellerUniversity: string;
  sellerCampus?: string;
  sellerEmail?: string;
  sellerPhone: string;
  rating: number;
  reviewCount: number;
  verifiedStudent: boolean;
  image: string;
  badge?: string;
  tags: string[];
  createdAt: string;
}

export interface StudentReview {
  id: string;
  authorName: string;
  authorUniversity: string;
  rating: number;
  comment: string;
  date: string;
  itemTitle?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  university: string;
  campus: string;
  email: string;
  phone: string;
  career: string;
  semester: string;
  bio: string;
  city: string;
  verifiedStudent: boolean;
  rating: number;
  dealsCount: number;
  joinedDate: string;
  preferredMeetingLocations: string[];
  reviews: StudentReview[];
}

export interface UserProfile {
  name: string;
  university: string;
  campus: string;
  email: string;
  city: string;
  whatsapp: string;
  semester?: string;
  career?: string;
  bio?: string;
}

export interface SearchState {
  query: string;
  category: Category;
  type: 'Todos' | 'Producto' | 'Servicio';
  maxPrice: number;
  minPrice: number;
  onlyMyUniversity: boolean;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating';
}

export interface AISearchResult {
  success: boolean;
  aiAdvisor?: string;
  matches?: {
    id: string;
    score: number;
    reason: string;
  }[];
  fallback?: boolean;
}
