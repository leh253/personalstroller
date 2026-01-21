
export type ParentStatus = 'future' | 'parent';

export interface Child {
  ageRange: string;
}

export interface UserFormData {
  email: string;
  password?: string;
  parentStatus: ParentStatus;
  pregnancyTermMonth?: string;
  pregnancyTermYear?: string;
  children: Child[];
  consent: boolean;
}

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizStep {
  id: string;
  question: string;
  options: QuizOption[];
}

export type QuizAnswers = Record<string, string>;

export interface Stroller {
  id?: number;
  marque: string;
  modele: string;
  Modele?: string;
  Q1: string;
  Q2: string;
  Q3: string;
  Q4: string;
  Q5: string;
  Q6: string;
  url_image?: string;
  url_produit?: string;
  "site web"?: string;
  [key: string]: any;
}

export type ScreenState = 'welcome' | 'quiz' | 'loading_results' | 'results';
