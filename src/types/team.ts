export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

export interface ExecomMember extends TeamMember {
  position: string;
  tenure: string;
}

export interface TeamData {
  execom: ExecomMember[];
  members: TeamMember[];
}