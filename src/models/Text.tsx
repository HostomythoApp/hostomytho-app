export interface Text {
  id: number;
  content: string;
  num?: string;
  origin?: string;
  test_plausibility?: number;
  is_hypothesis_specification_test?: boolean,
  is_condition_specification_test?: boolean,
  is_negation_specification_test?: boolean,
  is_plausibility_test?: boolean,
  includeSentences?: boolean,
  nb_of_treatments: number;
  reason_for_rate: string;
  is_active?: boolean;
}