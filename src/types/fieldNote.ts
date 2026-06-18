export interface FieldNote {
  id: number;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
  featured?: boolean;
}

export interface FieldNotesData {
  notes: FieldNote[];
}