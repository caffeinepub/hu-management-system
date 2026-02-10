/**
 * Centralized React Query Keys
 * Ensures consistent caching across the application
 */

export const QUERY_KEYS = {
  // User & Auth
  currentUserProfile: 'currentUserProfile',
  currentUserRole: 'currentUserRole',
  userProfile: (principal: string) => ['userProfile', principal],
  
  // Location Context
  selectedLocation: 'selectedLocation',
  locations: 'locations',
  location: (id: string) => ['location', id],
  
  // Gate Pass
  gatePasses: 'gatePasses',
  gatePass: (gpNumber: string) => ['gatePass', gpNumber],
  pendingGatePasses: (locationId: string) => ['pendingGatePasses', locationId],
  myGatePasses: 'myGatePasses',
  
  // Receiving
  receivingConfirmations: (gpNumber: string) => ['receivingConfirmations', gpNumber],
  
  // Security
  securityConfirmations: (gpNumber: string) => ['securityConfirmations', gpNumber],
  
  // Inventory
  inventory: (locationId: string) => ['inventory', locationId],
  inTransitInventory: 'inTransitInventory',
  
  // Stock Take
  stockTakes: 'stockTakes',
  stockTake: (id: string) => ['stockTake', id],
  activeStockTake: (locationId: string) => ['activeStockTake', locationId],
  
  // Reports
  exceptionReport: (filters: any) => ['exceptionReport', filters],
  reconciliationReport: (filters: any) => ['reconciliationReport', filters],
  shrinkageReport: (filters: any) => ['shrinkageReport', filters],
  
  // Audit
  auditTrail: (filters: any) => ['auditTrail', filters],
} as const;
