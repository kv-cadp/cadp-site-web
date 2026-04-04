export type RiasecDimension = "R" | "I" | "A" | "S" | "E" | "C";

export interface RiasecOption {
  text: string;
  dimension: RiasecDimension;
}

export interface RiasecQuestion {
  id: number;
  optionA: RiasecOption;
  optionB: RiasecOption;
}

export interface RiasecProfile {
  dimension: RiasecDimension;
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  recommendedFormation: string; // slug
  formationName: string;
}
