export interface TestSpecification {
    id: number;
    test_id: number;
    type: 'hypothesis' | 'condition' | 'negation';
    word_positions: string;
  }