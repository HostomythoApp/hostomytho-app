import { Token } from "models/Token";

export interface TextWithError {
  id: number;
  num: string;
  content: string;
  tokens: Token[];
  positionErrorTokens: string;
  origin: string;
  idUserErrorDetail: number;
  vote_weight: number;
  user_id: number;
}