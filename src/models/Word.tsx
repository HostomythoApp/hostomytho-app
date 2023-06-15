export interface Word {
  text: string;
  isSelected: boolean;
  sentenceId: number | null;
  isCurrentSelection?: boolean;
  position: number; 
  color?: string;
}
