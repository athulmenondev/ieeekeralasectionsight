import eventsData from '../../data/events.json';
import type { EventsData } from '../types';

export const getEventsData = (): EventsData => eventsData as EventsData;