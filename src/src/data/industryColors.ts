export const industryColors: Record<string, string> = {
  "RV Manufacturing": "#a8501f",
  "RV Components & Supply": "#c47b3f",
  "Manufactured Housing": "#8a3f1e",
  "Specialty Vehicles": "#1f5f5b",
  "Tire & Auto": "#3f6e2a",
  "Technology": "#5c3f8a",
  "Business Services": "#3f4f8a",
  "Industrial & Other": "#54585f",
};

export function industryColor(industry: string): string {
  return industryColors[industry] ?? industryColors["Industrial & Other"];
}
