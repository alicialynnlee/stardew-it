import {
  PiLeaf,
  PiSun,
  PiSnowflake,
  PiHammer,
  PiAcorn,
  PiFlower,
  PiPlant,
  PiStar,
  PiPawPrint,
  PiJar,
  PiFish,
  PiAnchor,
  PiMoon,
  PiDiamond,
  PiSword,
  PiForkKnife,
  PiMagnifyingGlass,
  PiDropHalf,
  PiGrains,
  PiSparkle,
  PiCurrencyDollar,
} from 'react-icons/pi';
import { IconType } from 'react-icons';

export interface BundleConfig {
  color: string;
  icon: IconType;
}

export const BUNDLE_CONFIG: Record<string, BundleConfig> = {
  // ── Crafts Room ──────────────────────────────────────────────────────────
  'Spring Foraging': { color: '#7A9D72', icon: PiFlower },
  'Summer Foraging': { color: '#B09640', icon: PiSun },
  'Fall Foraging': { color: '#A07038', icon: PiLeaf },
  'Winter Foraging': { color: '#6A8BA8', icon: PiSnowflake },
  Construction: { color: '#7A6850', icon: PiHammer },
  'Exotic Foraging': { color: '#7A6898', icon: PiAcorn },

  // ── Pantry ────────────────────────────────────────────────────────────────
  'Spring Crops': { color: '#7AAD74', icon: PiPlant },
  'Summer Crops': { color: '#B08830', icon: PiSun },
  'Fall Crops': { color: '#986838', icon: PiLeaf },
  'Quality Crops': { color: '#608860', icon: PiStar },
  Animal: { color: '#B09870', icon: PiPawPrint },
  Artisan: { color: '#8A5050', icon: PiJar },

  // ── Fish Tank ─────────────────────────────────────────────────────────────
  'River Fish': { color: '#4870A0', icon: PiFish },
  'Lake Fish': { color: '#407080', icon: PiFish },
  'Specialty Fish': { color: '#6850A0', icon: PiFish },
  'Ocean Fish': { color: '#3A6080', icon: PiAnchor },
  'Night Fishing': { color: '#404068', icon: PiMoon },
  'Crab Pot': { color: '#4E7050', icon: PiAnchor },

  // ── Boiler Room ───────────────────────────────────────────────────────────
  "Blacksmith's": { color: '#7A5040', icon: PiHammer },
  "Geologist's": { color: '#6A5888', icon: PiDiamond },
  "Adventurer's": { color: '#4A6A4A', icon: PiSword },

  // ── Bulletin Board ────────────────────────────────────────────────────────
  "Chef's": { color: '#9A8440', icon: PiForkKnife },
  'Field Research': { color: '#4A7868', icon: PiMagnifyingGlass },
  Dye: { color: '#786098', icon: PiDropHalf },
  Fodder: { color: '#786838', icon: PiGrains },
  "Enchanter's": { color: '#684870', icon: PiSparkle },

  // ── Vault ─────────────────────────────────────────────────────────────────
  '2,500': { color: '#A89850', icon: PiCurrencyDollar },
  '5,000': { color: '#988040', icon: PiCurrencyDollar },
  '10,000': { color: '#886830', icon: PiCurrencyDollar },
  '25,000': { color: '#785820', icon: PiCurrencyDollar },
};

export const DEFAULT_BUNDLE_CONFIG: BundleConfig = {
  color: '#6A6A6A',
  icon: PiStar,
};
