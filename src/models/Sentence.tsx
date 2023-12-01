import { TemporalEntity } from "./TemporalEntity";

export interface Sentence {
  id: number,
  content: string,
  temporalEntities: TemporalEntity[];
}
