export interface PromptState {
  age: string;
  gender: string;
  hairColor: string;
  hairStyle: string;
  expression: string;
  clothingType: string;
  clothingColor: string;
  clothingDetails: string;
  cameraStyle: string;
  angle: string;
  lighting: string;
  setting: string;
  atmosphere: string;
  aspectRatio: string;
  description: string;
  preserveOriginal: boolean;
  makeup: string;
  eyewearType: string;
  earringsType: string;
  jewelryType: string;
}

export interface OptionGroup {
  label: string;
  value: string;
}

export type PromptKey = keyof PromptState;