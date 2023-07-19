export interface UserSentenceSpecification {
  id: number;
  user_id?: number;
  text_id: number;
  type: number;
  content: string;
  startPosition: number;
  endPosition: number;
  createdAt?: string;
  color: string; 
}