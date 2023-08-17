import { Token } from "models/Token";

export interface TextWithTokens {
    id: number;
    id_theme: number;
    is_hypothesis_specification_test: number;
    is_condition_specification_test: number;
    is_negation_specification_test: number;
    is_plausibility_test: number;
    test_plausibility: number;
    tokens: Token[];
  }