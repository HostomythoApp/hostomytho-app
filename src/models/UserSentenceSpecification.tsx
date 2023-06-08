export interface UserSentenceSpecification {
  id: number;
  userId: number;
  textId: number;
  type: number;
  content: string;
  startPosition: number;
  endPosition: number;
  createdAt: Date;
}