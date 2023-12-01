export interface TestSpecification {
    id: number;
    text_id: number;
    type: 'hypothesis' | 'condition' | 'negation';
    content: string;
    word_positions: string;
}