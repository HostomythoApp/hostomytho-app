export interface UserSentenceSpecification {
  id: number;
  user_id?: number;
  text_id: number;
  type: 'hypothesis' | 'condition' | 'negation';
  content: string;
  word_positions: string;
  specification_weight: number; 
  createdAt?: string;
  color?: string;
}