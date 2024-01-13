export interface Text {
  id: number;
  content: string;
  id_theme?: number;
  num?: string;
  origin?: string;
  test_plausibility?: number;
  is_hypothesis_specification_test?: boolean,
  is_condition_specification_test?: boolean,
  is_negation_specification_test?: boolean,
  is_plausibility_test?: boolean,
  includeSentences?: boolean
}

// TODO ajouter le model ErrorDetail