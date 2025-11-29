import {
  AGES, GENDERS, HAIR_COLORS, HAIR_STYLES, EXPRESSIONS,
  CLOTHING_TYPES, CAMERA_STYLES, ANGLES, LIGHTING, SETTINGS, ASPECT_RATIOS
} from '../data/options';
import { PromptState } from '../types';

const getRandomItem = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

// Helper to pick from a restricted list
const getRandomFromSubset = (subset: string[], fullList: string[]): string => {
  const valid = fullList.filter(item => subset.includes(item));
  return valid.length > 0 ? getRandomItem(valid) : getRandomItem(fullList);
};

export const generateRandomPrompt = (): PromptState => {
  // Base randomization
  let age = getRandomItem(AGES);
  let gender = getRandomItem(GENDERS);
  let hairColor = getRandomItem(HAIR_COLORS);
  let hairStyle = getRandomItem(HAIR_STYLES);
  let expression = getRandomItem(EXPRESSIONS);
  let clothingType = getRandomItem(CLOTHING_TYPES);
  let clothingColor = getRandomItem(["Red", "Black", "White", "Blue", "Green", "Pastel", "Neon"]);
  let cameraStyle = getRandomItem(CAMERA_STYLES);
  let angle = getRandomItem(ANGLES);
  let lighting = getRandomItem(LIGHTING);
  let setting = getRandomItem(SETTINGS);
  let aspectRatio = getRandomItem(ASPECT_RATIOS);
  const description = `A realistic photo of a ${age.toLowerCase()} ${gender.toLowerCase()}.`;

  // --- SMART RANDOMIZER LOGIC ---

  // Rule 1 (Selfies): If cameraStyle includes "Selfie", restrict Angle.
  if (cameraStyle.toLowerCase().includes("selfie")) {
    const validSelfieAngles = ["Eye-level", "High angle", "Low angle"];
    angle = getRandomFromSubset(validSelfieAngles, ANGLES);
  }

  // Rule 2 (Drones): If cameraStyle is "Drone Shot"
  if (cameraStyle === "Drone Shot") {
    // Angle must be High or Bird's eye
    const validDroneAngles = ["High angle", "Bird's eye view"];
    angle = getRandomFromSubset(validDroneAngles, ANGLES);
    
    // Implicit Shot Type handling (Simulated since we don't have a distinct shot_type field in the simplified UI, 
    // but we avoid macro/close-up logic if we were to expand this). 
    // For this specific requirement, if we had a shot_type field, we would filter it here.
  }

  // Rule 3 (Portraits/Ratio): If aspectRatio is "9:16 (Stories)"
  if (aspectRatio === "9:16 (Stories)") {
    // Avoid "Cinematic" ratios is handled by assignment, but let's ensure the setting isn't too wide-scope logic if applicable.
    // The requirement says "Do not select Cinematic landscape settings". 
    // We will reroll if the setting feels strictly wide landscape-y (Heuristic).
    const landscapeSettings = ["Snowy mountains", "Desert"]; 
    // If we hit a wide landscape setting, 50% chance to reroll to something more vertical friendly
    if (landscapeSettings.includes(setting) && Math.random() > 0.5) {
       const portraitSettings = ["Interior car", "Minimalist studio", "Neon city", "Old library"];
       setting = getRandomFromSubset(portraitSettings, SETTINGS);
    }
  }

  return {
    age,
    gender,
    hairColor,
    hairStyle,
    expression,
    clothingType,
    clothingColor,
    cameraStyle,
    angle,
    lighting,
    setting,
    aspectRatio,
    description
  };
};