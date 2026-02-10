/**
 * Status Constants for UI
 */

// Gate Pass Status
export const GP_STATUS = {
  CREATED: 'Created',
  PENDING_RECEIPT: 'PendingReceipt',
  RECEIVED: 'Received',
  CLOSED: 'Closed',
} as const;

export type GPStatus = typeof GP_STATUS[keyof typeof GP_STATUS];

export const GP_STATUS_LABELS: Record<string, string> = {
  Created: 'Created',
  PendingReceipt: 'Pending Receipt',
  Received: 'Received',
  Closed: 'Closed',
};

export const GP_STATUS_COLORS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  Created: 'secondary',
  PendingReceipt: 'default',
  Received: 'outline',
  Closed: 'secondary',
};

// Stock Take Status
export const STOCK_TAKE_STATUS = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
} as const;

export type StockTakeStatus = typeof STOCK_TAKE_STATUS[keyof typeof STOCK_TAKE_STATUS];

export const STOCK_TAKE_STATUS_LABELS: Record<string, string> = {
  Draft: 'Draft',
  Submitted: 'Submitted',
  Approved: 'Approved',
  Rejected: 'Rejected',
};

export const STOCK_TAKE_STATUS_COLORS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  Draft: 'secondary',
  Submitted: 'default',
  Approved: 'outline',
  Rejected: 'destructive',
};

// Exception Status
export const EXCEPTION_STATUS = {
  OPEN: 'Open',
  RESOLVED: 'Resolved',
} as const;

export type ExceptionStatus = typeof EXCEPTION_STATUS[keyof typeof EXCEPTION_STATUS];

export const EXCEPTION_STATUS_LABELS: Record<string, string> = {
  Open: 'Open',
  Resolved: 'Resolved',
};

export const EXCEPTION_STATUS_COLORS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  Open: 'destructive',
  Resolved: 'outline',
};

// Inventory Status
export const INVENTORY_STATUS = {
  ON_HAND: 'OnHand',
  IN_TRANSIT: 'InTransit',
} as const;

export type InventoryStatus = typeof INVENTORY_STATUS[keyof typeof INVENTORY_STATUS];

export const INVENTORY_STATUS_LABELS: Record<string, string> = {
  OnHand: 'On Hand',
  InTransit: 'In Transit',
};

// Location Type
export const LOCATION_TYPE = {
  DC: 'DC',
  STORE: 'Store',
  OTHER: 'Other',
} as const;

export type LocationType = typeof LOCATION_TYPE[keyof typeof LOCATION_TYPE];

export const LOCATION_TYPE_LABELS: Record<string, string> = {
  DC: 'Distribution Center',
  Store: 'Store',
  Other: 'Other',
};
