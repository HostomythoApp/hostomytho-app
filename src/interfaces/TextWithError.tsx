import { Token } from "models/Token";

export interface TextWithError {
    id: number;
    content: string;
    tokens: Token[];
    positionErrorTokens: string;
  }