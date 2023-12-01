export interface UserSentenceSpecification {
    id: number;
    user_id?: number;
    text_id?: number;
    plausibility: number;
    vote_weight: number;
}