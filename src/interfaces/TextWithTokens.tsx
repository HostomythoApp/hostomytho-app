import { Token } from "models/Token";

export interface TextWithTokens {
    id: number;
    id_theme: number;
    is_plausibility_test: number;
    test_plausibility: number;
    is_specification_test: number;
    tokens: Token[];
  }