/**
 * Unit Conversion Utilities
 */

export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function lbsToKg(lbs: number): number {
  return Math.round((lbs / 2.20462) * 10) / 10;
}

export function cmToInches(cm: number): number {
  return Math.round((cm / 2.54) * 10) / 10;
}

export function inchesToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}

export function mlToOz(ml: number): number {
  return Math.round((ml / 29.5735) * 10) / 10;
}

export function formatWeight(weightKg: number, unitSystem: 'metric' | 'imperial' = 'metric'): string {
  if (unitSystem === 'imperial') {
    return `${kgToLbs(weightKg)} lbs`;
  }
  return `${weightKg} kg`;
}

export function formatHeight(heightCm: number, unitSystem: 'metric' | 'imperial' = 'metric'): string {
  if (unitSystem === 'imperial') {
    const totalInches = heightCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  }
  return `${heightCm} cm`;
}
