export interface User {
    id: number;
    username: string;
    email?: string;
    password?: string;
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
    catch_probability: string;
    consecutiveDaysPlayed: number;
    created_at: string;
    coeffMulti: number;
    nb_first_monthly: number;
    tutorial_progress: number;
  }
  