import fieldNotesData from '../../data/fieldnotes.json';
import type { FieldNotesData } from '../types';

export const getFieldNotesData = (): FieldNotesData =>
  fieldNotesData as FieldNotesData;

export const getFeaturedFieldNotes = () =>
  (fieldNotesData as any).filter((n: any) => n.featured);