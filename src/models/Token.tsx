export interface Token {
  id: number;
  text_id: number;
  content: string;
  position: number;
  isCurrentSelection?: boolean;
  color?: string;
  isSelected?: boolean;
  sentenceId?: number;
}
