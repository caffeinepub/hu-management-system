/**
 * Handling Unit (HU) Type Constants
 */

export const HU_TYPES = {
  CRATE: 'Crate',
  CARTON: 'Carton',
  BAG: 'Bag',
  SHIPPER_BOX: 'ShipperBox',
  OTHER: 'Other',
} as const;

export type HUType = typeof HU_TYPES[keyof typeof HU_TYPES];

export const HU_TYPE_LABELS: Record<string, string> = {
  Crate: 'Crate',
  Carton: 'Carton',
  Bag: 'Bag',
  ShipperBox: 'Shipper Box',
  Other: 'Other',
};

export const HU_TYPE_DESCRIPTIONS: Record<string, string> = {
  Crate: 'Reusable handling unit for multi-trip logistics',
  Carton: 'Single-use or limited reuse box',
  Bag: 'Flexible handling unit for loose or bulk items',
  ShipperBox: 'Insulated unit for cold chain goods',
  Other: 'Other handling unit types',
};

/**
 * HU types that are inventory-tracked
 * Only Crate and Shipper Box maintain inventory balances
 */
export const INVENTORY_TRACKED_HU_TYPES: string[] = [
  HU_TYPES.CRATE,
  HU_TYPES.SHIPPER_BOX,
];

/**
 * HU types that are NOT inventory-tracked
 */
export const NON_INVENTORY_HU_TYPES: string[] = [
  HU_TYPES.CARTON,
  HU_TYPES.BAG,
  HU_TYPES.OTHER,
];

/**
 * HU types for security confirmation (only Crate and Shipper Box)
 */
export const SECURITY_CONFIRMATION_HU_TYPES: string[] = [
  HU_TYPES.CRATE,
  HU_TYPES.SHIPPER_BOX,
];

/**
 * Check if an HU type is inventory-tracked
 */
export function isInventoryTracked(huType: string): boolean {
  return INVENTORY_TRACKED_HU_TYPES.includes(huType);
}

/**
 * Check if an HU type requires security confirmation
 */
export function requiresSecurityConfirmation(huType: string): boolean {
  return SECURITY_CONFIRMATION_HU_TYPES.includes(huType);
}

/**
 * Get all HU types as array
 */
export function getAllHUTypes(): string[] {
  return Object.values(HU_TYPES);
}

/**
 * Get inventory-tracked HU types for display
 */
export function getInventoryHUTypes(): string[] {
  return INVENTORY_TRACKED_HU_TYPES;
}
