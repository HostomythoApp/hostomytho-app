export interface TestSpecification {
    id: number;
    test_id: number;
    type: 'hypothesis' | 'condition' | 'negation';
    content: string;
    word_positions: string;
}