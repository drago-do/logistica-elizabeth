export const PRICES = {
  "CDMX": {
    destinations: ["Nuevo Laredo", "Querétaro", "Veracruz", "San Luis Potosí"],
    rates: {
      1: 12000,
      2: 13500,
      3: 15000,
      4: 19000,
      5: 22000
    }
  },
  "Monterrey": {
    destinations: ["Nuevo Laredo", "Querétaro", "Veracruz", "San Luis Potosí"],
    rates: {
      1: 10000,
      2: 13500,
      3: 15500,
      4: 17000,
      5: 19000
    }
  },
  "Guadalajara": {
    destinations: ["Nuevo Laredo", "Querétaro", "Veracruz", "San Luis Potosí"],
    rates: {
      1: 11000,
      2: 13000,
      3: 14500,
      4: 16000,
      5: 19000
    }
  },
  "Nuevo Laredo": {
    destinations: ["Querétaro", "Veracruz", "San Luis Potosí"],
    rates: {
      1: 11500,
      2: 13000,
      3: 14500,
      4: 15500,
      5: 16500
    }
  }
} as const;

export type Origin = keyof typeof PRICES;
export type Destination = (typeof PRICES)[Origin]["destinations"][number];
