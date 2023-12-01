import { Token } from "models/Token";

export interface TextWithTokens {
  id: number;
  num: string;
  origin: string;
  id_theme: number;
  is_hypothesis_specification_test: boolean;
  is_condition_specification_test: boolean;
  is_negation_specification_test: boolean;
  is_plausibility_test: boolean;
  test_plausibility?: number;
  tokens: Token[];
}