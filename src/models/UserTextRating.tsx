export interface UserTextRating {
    id: number;
    user_id?: number;
    text_id?: number;
    plausibility: number;
    sentence_positions: string;
    vote_weight: number;
}