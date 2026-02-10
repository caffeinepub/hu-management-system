/**
 * Application Role Constants
 * Aligned with backend AppRole enum
 */

import { AppRole } from '../../backend';

export const APP_ROLES = {
  DEO: 'DEO' as AppRole,
  RECEIVER: 'Receiver' as AppRole,
  SECURITY: 'Security' as AppRole,
  INVENTORY_CONTROLLER: 'InventoryController' as AppRole,
  LOSS_PREVENTION_OFFICER: 'LossPreventionOfficer' as AppRole,
  OPERATIONS: 'Operations' as AppRole,
  AUDITOR: 'Auditor' as AppRole,
} as const;

export const ROLE_LABELS: Record<AppRole, string> = {
  DEO: 'Data Entry Operator',
  Receiver: 'Receiver',
  Security: 'Security',
  InventoryController: 'Inventory Controller',
  LossPreventionOfficer: 'Loss Prevention Officer',
  Operations: 'Operations',
  Auditor: 'Auditor',
};

export const ROLE_DESCRIPTIONS: Record<AppRole, string> = {
  DEO: 'Creates gate passes for HU movements',
  Receiver: 'Receives goods at destination and confirms receipt',
  Security: 'Confirms returned HUs at DC main gate',
  InventoryController: 'Manages stock takes and reconciliation',
  LossPreventionOfficer: 'Views exceptions and shrinkage reports',
  Operations: 'Views inventory and operational reports',
  Auditor: 'Views audit trails and all reports',
};

/**
 * Role-based module access matrix
 */
export const ROLE_PERMISSIONS: Partial<Record<AppRole, readonly string[]>> = {
  DEO: ['gatepass-create', 'gatepass-list'],
  Receiver: ['receiving-pending', 'receiving-confirm'],
  Security: ['security-confirm'],
  InventoryController: [
    'inventory-dashboard',
    'stocktake-create',
    'stocktake-submit',
    'stocktake-approve',
    'reports-reconciliation',
  ],
  LossPreventionOfficer: [
    'reports-exception',
    'reports-shrinkage',
    'audit-trail',
  ],
  Operations: [
    'inventory-dashboard',
    'reports-reconciliation',
  ],
  Auditor: [
    'reports-exception',
    'reports-reconciliation',
    'reports-shrinkage',
    'audit-trail',
  ],
} as const;

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: AppRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}

/**
 * Check if any of the user's roles has a specific permission
 */
export function hasAnyPermission(roles: AppRole[], permission: string): boolean {
  return roles.some(role => hasPermission(role, permission));
}
