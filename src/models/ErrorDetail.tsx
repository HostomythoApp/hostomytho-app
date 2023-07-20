export interface ErrorDetail {
    id: number;
    user_text_rating_id: number;
    content: string;
    startPosition: number;
    endPosition: number;
    type?: string;
    createdAt?: Date;
    color: string; 
}