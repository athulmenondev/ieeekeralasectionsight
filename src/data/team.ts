import teamData from '../../data/team.json';
import type { TeamData } from '../types';

export const getTeamData = (): TeamData => teamData as TeamData;