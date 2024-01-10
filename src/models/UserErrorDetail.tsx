export interface UserErrorDetail {
  id: number;
  user_id?: number;
  text_id: number;
  word_positions: string;
  vote_weight?: number;
  content: string;
  is_test?: boolean,
  color?: string; 
}