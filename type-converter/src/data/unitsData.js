// All units are converted through a "base unit" per category.
// value_in_base = value * unit.factor
// Temperature is handled separately since it isn't a pure multiplier.

export const categories = {
  Length: {
    icon: "📏",
    base: "Meter",
    units: {
      Millimeter: { symbol: "mm", factor: 0.001 },
      Centimeter: { symbol: "cm", factor: 0.01 },
      Meter: { symbol: "m", factor: 1 },
      Kilometer: { symbol: "km", factor: 1000 },
      Inch: { symbol: "in", factor: 0.0254 },
      Foot: { symbol: "ft", factor: 0.3048 },
      Yard: { symbol: "yd", factor: 0.9144 },
      Mile: { symbol: "mi", factor: 1609.344 },
      "Nautical Mile": { symbol: "nmi", factor: 1852 },
    },
  },
  Weight: {
    icon: "⚖️",
    base: "Kilogram",
    units: {
      Milligram: { symbol: "mg", factor: 0.000001 },
      Gram: { symbol: "g", factor: 0.001 },
      Kilogram: { symbol: "kg", factor: 1 },
      "Metric Ton": { symbol: "t", factor: 1000 },
      Ounce: { symbol: "oz", factor: 0.0283495 },
      Pound: { symbol: "lb", factor: 0.453592 },
      Stone: { symbol: "st", factor: 6.35029 },
    },
  },
  Temperature: {
    icon: "🌡️",
    base: "Celsius",
    units: {
      Celsius: { symbol: "°C" },
      Fahrenheit: { symbol: "°F" },
      Kelvin: { symbol: "K" },
    },
  },
  Volume: {
    icon: "🧪",
    base: "Liter",
    units: {
      Milliliter: { symbol: "ml", factor: 0.001 },
      Liter: { symbol: "L", factor: 1 },
      "Cubic Meter": { symbol: "m³", factor: 1000 },
      Teaspoon: { symbol: "tsp", factor: 0.00492892 },
      Tablespoon: { symbol: "tbsp", factor: 0.0147868 },
      "Fluid Ounce": { symbol: "fl oz", factor: 0.0295735 },
      Cup: { symbol: "cup", factor: 0.236588 },
      Pint: { symbol: "pt", factor: 0.473176 },
      Quart: { symbol: "qt", factor: 0.946353 },
      Gallon: { symbol: "gal", factor: 3.78541 },
    },
  },
  Area: {
    icon: "▦",
    base: "Square Meter",
    units: {
      "Square Millimeter": { symbol: "mm²", factor: 0.000001 },
      "Square Centimeter": { symbol: "cm²", factor: 0.0001 },
      "Square Meter": { symbol: "m²", factor: 1 },
      Hectare: { symbol: "ha", factor: 10000 },
      "Square Kilometer": { symbol: "km²", factor: 1000000 },
      "Square Inch": { symbol: "in²", factor: 0.00064516 },
      "Square Foot": { symbol: "ft²", factor: 0.092903 },
      "Square Yard": { symbol: "yd²", factor: 0.836127 },
      Acre: { symbol: "ac", factor: 4046.86 },
      "Square Mile": { symbol: "mi²", factor: 2589988.11 },
    },
  },
  Speed: {
    icon: "⚡",
    base: "Meter/Second",
    units: {
      "Meter/Second": { symbol: "m/s", factor: 1 },
      "Kilometer/Hour": { symbol: "km/h", factor: 0.277778 },
      "Mile/Hour": { symbol: "mph", factor: 0.44704 },
      Knot: { symbol: "kn", factor: 0.514444 },
      "Foot/Second": { symbol: "ft/s", factor: 0.3048 },
    },
  },
  Time: {
    icon: "⏱️",
    base: "Second",
    units: {
      Millisecond: { symbol: "ms", factor: 0.001 },
      Second: { symbol: "s", factor: 1 },
      Minute: { symbol: "min", factor: 60 },
      Hour: { symbol: "hr", factor: 3600 },
      Day: { symbol: "d", factor: 86400 },
      Week: { symbol: "wk", factor: 604800 },
      Month: { symbol: "mo", factor: 2629746 },
      Year: { symbol: "yr", factor: 31556952 },
    },
  },
  Digital: {
    icon: "💾",
    base: "Byte",
    units: {
      Bit: { symbol: "bit", factor: 0.125 },
      Byte: { symbol: "B", factor: 1 },
      Kilobyte: { symbol: "KB", factor: 1024 },
      Megabyte: { symbol: "MB", factor: 1048576 },
      Gigabyte: { symbol: "GB", factor: 1073741824 },
      Terabyte: { symbol: "TB", factor: 1099511627776 },
    },
  },
  Pressure: {
    icon: "🎈",
    base: "Pascal",
    units: {
      Pascal: { symbol: "Pa", factor: 1 },
      Kilopascal: { symbol: "kPa", factor: 1000 },
      Bar: { symbol: "bar", factor: 100000 },
      PSI: { symbol: "psi", factor: 6894.76 },
      Atmosphere: { symbol: "atm", factor: 101325 },
      "Torr (mmHg)": { symbol: "Torr", factor: 133.322 },
    },
  },
  Energy: {
    icon: "🔋",
    base: "Joule",
    units: {
      Joule: { symbol: "J", factor: 1 },
      Kilojoule: { symbol: "kJ", factor: 1000 },
      Calorie: { symbol: "cal", factor: 4.184 },
      Kilocalorie: { symbol: "kcal", factor: 4184 },
      "Watt-hour": { symbol: "Wh", factor: 3600 },
      "Kilowatt-hour": { symbol: "kWh", factor: 3600000 },
      Electronvolt: { symbol: "eV", factor: 1.602176634e-19 },
    },
  },
};

// Temperature needs real conversion functions, not a flat factor
const toCelsius = {
  Celsius: (v) => v,
  Fahrenheit: (v) => ((v - 32) * 5) / 9,
  Kelvin: (v) => v - 273.15,
};

const fromCelsius = {
  Celsius: (v) => v,
  Fahrenheit: (v) => (v * 9) / 5 + 32,
  Kelvin: (v) => v + 273.15,
};

export function convertTemperature(value, fromUnit, toUnit) {
  const celsius = toCelsius[fromUnit](value);
  return fromCelsius[toUnit](celsius);
}

export function convertValue(value, category, fromUnit, toUnit) {
  if (category === "Temperature") {
    return convertTemperature(value, fromUnit, toUnit);
  }
  const { units } = categories[category];
  const baseValue = value * units[fromUnit].factor;
  return baseValue / units[toUnit].factor;
}