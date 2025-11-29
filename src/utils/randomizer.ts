import {
  AGES, GENDERS, HAIR_COLORS, HAIR_STYLES, EXPRESSIONS,
  CLOTHING_TYPES, CLOTHING_COLORS, CAMERA_STYLES, ANGLES, LIGHTING, SETTINGS, ASPECT_RATIOS,
  EYEWEAR, EARRINGS, NECKLACES
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
  let clothingColor = getRandomItem(CLOTHING_COLORS);
  let cameraStyle = getRandomItem(CAMERA_STYLES);
  let angle = getRandomItem(ANGLES);
  let lighting = getRandomItem(LIGHTING);
  let setting = getRandomItem(SETTINGS);
  let aspectRatio = getRandomItem(ASPECT_RATIOS);
  
  // Accessories
  let eyewearType = Math.random() > 0.7 ? getRandomItem(EYEWEAR.filter(e => e !== 'None')) : 'None';
  let earringsType = Math.random() > 0.6 ? getRandomItem(EARRINGS.filter(e => e !== 'None')) : 'None';
  let jewelryType = Math.random() > 0.6 ? getRandomItem(NECKLACES.filter(e => e !== 'None')) : 'None';
  let preserveOriginal = Math.random() > 0.5;
  let makeup = gender === "Female" ? "Natural makeup" : "";
  let atmosphere = "cinematic atmosphere";
  let clothingDetails = "high quality fabric";
  
  const description = ""; 

  // --- SMART RANDOMIZER LOGIC ---

  // Rule 1 (Selfies): If cameraStyle includes "Selfie", restrict Angle.
  if (cameraStyle.toLowerCase().includes("selfie")) {
    const validSelfieAngles = ["Eye-level", "High angle", "Low angle", "Selfie angle"];
    angle = getRandomFromSubset(validSelfieAngles, ANGLES);
  }

  // Rule 2 (Drones): If cameraStyle is "Drone Shot"
  if (cameraStyle === "Drone Shot") {
    const validDroneAngles = ["High angle", "Bird's eye view"];
    angle = getRandomFromSubset(validDroneAngles, ANGLES);
  }

  // Rule 3 (Portraits/Ratio): If aspectRatio is "9:16 (Stories)"
  // Avoid wide cinematic settings for vertical stories if possible
  if (aspectRatio.startsWith("9:16")) {
     // Heuristic: prefer vertical friendly settings
     const wideSettings = ["Desert dunes", "Beach sunset", "Snowy mountains"];
     if (wideSettings.includes(setting) && Math.random() > 0.5) {
        // Reroll
        setting = getRandomItem(SETTINGS.filter(s => !wideSettings.includes(s)));
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
    clothingDetails,
    cameraStyle,
    angle,
    lighting,
    setting,
    atmosphere,
    aspectRatio,
    description,
    preserveOriginal,
    makeup,
    eyewearType,
    earringsType,
    jewelryType
  };
};