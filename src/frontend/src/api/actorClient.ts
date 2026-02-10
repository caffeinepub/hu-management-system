/**
 * Actor Client Wrapper
 * Thin wrapper around useActor() for UI-oriented functions
 */

import { useActor } from '../hooks/useActor';
import { UserProfile } from '../backend';

/**
 * Hook to access backend actor with typed methods
 */
export function useActorClient() {
  const { actor, isFetching } = useActor();

  return {
    actor,
    isFetching,
    isReady: !!actor && !isFetching,

    // User Profile Methods
    async getCallerUserProfile(): Promise<UserProfile | null> {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },

    async saveCallerUserProfile(profile: UserProfile): Promise<void> {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },

    async assignUserProfile(user: string, profile: UserProfile): Promise<void> {
      if (!actor) throw new Error('Actor not available');
      // Convert string to Principal if needed
      return actor.assignUserProfile(user as any, profile);
    },

    // Placeholder methods for future backend capabilities
    // These will be implemented as backend methods become available

    async createGatePass(input: any): Promise<any> {
      throw new Error('Not yet implemented in backend');
    },

    async getGatePassByNumber(gpNumber: string): Promise<any> {
      throw new Error('Not yet implemented in backend');
    },

    async listPendingGatePasses(locationId: string): Promise<any[]> {
      throw new Error('Not yet implemented in backend');
    },

    async confirmReceipt(input: any): Promise<void> {
      throw new Error('Not yet implemented in backend');
    },

    async confirmSecurity(input: any): Promise<void> {
      throw new Error('Not yet implemented in backend');
    },

    async getInventoryByLocation(locationId: string): Promise<any[]> {
      throw new Error('Not yet implemented in backend');
    },

    async getInTransitInventory(filters: any): Promise<any[]> {
      throw new Error('Not yet implemented in backend');
    },

    async createStockTake(locationId: string): Promise<string> {
      throw new Error('Not yet implemented in backend');
    },

    async submitStockTake(input: any): Promise<void> {
      throw new Error('Not yet implemented in backend');
    },

    async approveStockTake(stockTakeId: string): Promise<void> {
      throw new Error('Not yet implemented in backend');
    },

    async getExceptionReport(filters: any): Promise<any[]> {
      throw new Error('Not yet implemented in backend');
    },

    async getReconciliationReport(filters: any): Promise<any[]> {
      throw new Error('Not yet implemented in backend');
    },

    async getShrinkageReport(filters: any): Promise<any[]> {
      throw new Error('Not yet implemented in backend');
    },

    async getAuditTrail(filters: any): Promise<any[]> {
      throw new Error('Not yet implemented in backend');
    },
  };
}
