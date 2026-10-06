export interface CardItem {
  id: number;
  content: string;
  isFlipped: boolean;
  hasMatched: boolean;
  onClick?: () => void;
}
