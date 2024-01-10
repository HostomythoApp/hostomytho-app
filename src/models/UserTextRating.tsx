export interface UserTextRating {
    id: number;
    user_id?: number;
    text_id?: number;
    plausibility: number;
    vote_weight: number;
}