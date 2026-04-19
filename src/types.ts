
export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Bungalow' | 'Villa';
  location: string;
  imageUrl: string;
  alt: string;
  description: string;
  area: string;
  year: string;
  duration: string;
  fullDescription: string;
  materials?: {
    name: string;
    description: string;
    imageUrl?: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  alt: string;
  details: string[];
  path: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  project: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  imageUrl: string;
  alt: string;
}

export interface Guideline {
  id: string;
  title: string;
  description: string;
  dos: string[];
  donts: string[];
}

export interface SignatureModule {
  id: string;
  title: string;
  description: string;
  investment: string;
  materials: string[];
  features: string[];
  imageUrl: string;
}

