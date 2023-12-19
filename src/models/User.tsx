export interface User {
    id: number;
    username: string;
    password: string;
    email?: string;
    status: string;
    points: number;
    monthly_points: number;
    trust_index: number;
    theme: string;
    notifications_enabled: boolean;
    gender: string;
    color_skin: string;
    moderator: boolean;
    ranking?: number;
    catch_probability: number;
    consecutiveDaysPlayed: number;
    coeffMulti: number;
  }
  