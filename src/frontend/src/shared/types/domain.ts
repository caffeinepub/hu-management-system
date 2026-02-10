/**
 * Frontend Domain Types
 * Client-side view models for UI development
 */

import { AppRole } from '../../backend';

// User & Profile
export interface UserProfile {
  name: string;
  appRoles: AppRole[];
  assignedLocationIds: string[];
}

// Location
export interface Location {
  id: string;
  name: string;
  locationType: 'DC' | 'Store' | 'Other';
  isActive: boolean;
  createdAt: number;
}

// Gate Pass
export interface GatePass {
  gpNumber: string;
  gpDate: number;
  fromLocationId: string;
  toLocationId: string;
  shippingReference: string;
  status: 'Created' | 'PendingReceipt' | 'Received' | 'Closed';
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

export interface GatePassLine {
  gpNumber: string;
  huType: string;
  dispatchedQty: number;
  receivedQty: number;
  securityConfirmedQty?: number;
}

export interface GatePassDetail {
  gatePass: GatePass;
  lines: GatePassLine[];
  fromLocation?: Location;
  toLocation?: Location;
}

export interface CreateGatePassInput {
  fromLocationId: string;
  toLocationId: string;
  shippingReference: string;
  lines: {
    huType: string;
    quantity: number;
  }[];
}

export interface CreateGatePassResult {
  gpNumber: string;
  warning?: string;
}

// Receiving
export interface ConfirmReceiptInput {
  gpNumber: string;
  receivedQuantities: {
    huType: string;
    quantity: number;
  }[];
}

// Security
export interface ConfirmSecurityInput {
  gpNumber: string;
  crateQty: number;
  shipperBoxQty: number;
}

// Inventory
export interface InventoryBalance {
  id: string;
  locationId: string;
  huType: string;
  status: 'OnHand' | 'InTransit';
  quantity: number;
  lastUpdated: number;
}

export interface InTransitSummary {
  gpNumber: string;
  fromLocationId: string;
  toLocationId: string;
  huType: string;
  quantity: number;
  gpDate: number;
}

// Stock Take
export interface StockTake {
  id: string;
  locationId: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  createdBy: string;
  createdAt: number;
  submittedBy?: string;
  submittedAt?: number;
  approvedBy?: string;
  approvedAt?: number;
}

export interface StockTakeLine {
  stockTakeId: string;
  huType: string;
  systemQty: number;
  physicalQty: number;
  varianceQty: number;
  reasonCode: string;
  notes: string;
}

export interface SubmitStockTakeInput {
  stockTakeId: string;
  lines: {
    huType: string;
    physicalQty: number;
    reasonCode: string;
    notes: string;
  }[];
}

// Exception
export interface ExceptionRecord {
  id: string;
  gpNumber: string;
  locationId: string;
  huType: string;
  dispatchedQty: number;
  receivedQty: number;
  varianceQty: number;
  status: 'Open' | 'Resolved';
  createdAt: number;
  resolvedBy?: string;
  resolvedAt?: number;
  resolutionNotes: string;
}

// Reports
export interface ReconciliationRow {
  gpNumber: string;
  gpDate: number;
  fromLocationId: string;
  toLocationId: string;
  cratesDispatched: number;
  cratesReceived: number;
  shipperBoxesDispatched: number;
  shipperBoxesReceived: number;
}

export interface ShrinkageRow {
  locationId: string;
  locationName: string;
  huType: string;
  systemOH: number;
  physicalOH: number;
  varianceQty: number;
  shrinkagePercent: number;
}

// Audit
export interface AuditEvent {
  id: string;
  eventType: 'Create' | 'Update' | 'Delete' | 'Approve' | 'Reject' | 'Confirm';
  entityType: string;
  entityId: string;
  performedBy: string;
  performedAt: number;
  details: string;
}

// Filters
export interface DateRangeFilter {
  fromDate: number;
  toDate: number;
}

export interface ExceptionReportFilters extends DateRangeFilter {
  locationId?: string;
  huType?: string;
  status?: 'Open' | 'Resolved';
}

export interface ReconciliationFilters extends DateRangeFilter {
  locationId?: string;
}

export interface ShrinkageFilters extends DateRangeFilter {
  locationId?: string;
}

export interface AuditFilters extends DateRangeFilter {
  entityType?: string;
  performedBy?: string;
}
