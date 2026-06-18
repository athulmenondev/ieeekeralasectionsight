export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'workshop' | 'meetup' | 'webinar' | 'hackathon';
  registrationUrl?: string;
  featured?: boolean;
}

export interface EventsData {
  events: Event[];
  pastEvents: Event[];
}