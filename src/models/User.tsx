export interface User {
    id: number;
    username: string;
    password: string;
    email?: string;
    status: string;
    points: number;
    trust_index: number;
    theme: string;
    notifications_enabled: boolean;
    gender: string;
    ranking?: number;
  }
  