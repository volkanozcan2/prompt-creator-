export interface PromptState {
  age: string;
  gender: string;
  hairColor: string;
  hairStyle: string;
  expression: string;
  clothingType: string;
  clothingColor: string;
  cameraStyle: string;
  angle: string;
  lighting: string;
  setting: string;
  aspectRatio: string;
  description: string;
}

export interface OptionGroup {
  label: string;
  value: string;
}

export type PromptKey = keyof PromptState;