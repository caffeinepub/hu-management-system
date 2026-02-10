/**
 * Centralized React Query Hooks
 * Manages all backend operations and data invalidation
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { QUERY_KEYS } from '../shared/queryKeys';
import { UserProfile } from '../backend';

/**
 * User Profile Queries
 */
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: [QUERY_KEYS.currentUserProfile],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.currentUserProfile] });
    },
  });
}

/**
 * Placeholder queries for future backend capabilities
 * These will be implemented as backend methods become available
 */

export function useCreateGatePass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: any) => {
      throw new Error('Not yet implemented in backend');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.gatePasses] });
    },
  });
}

export function useListPendingGatePasses(locationId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.pendingGatePasses(locationId),
    queryFn: async () => {
      throw new Error('Not yet implemented in backend');
    },
    enabled: false, // Disabled until backend is ready
  });
}

export function useConfirmReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: any) => {
      throw new Error('Not yet implemented in backend');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.pendingGatePasses] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.inventory] });
    },
  });
}

export function useGetInventory(locationId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.inventory(locationId),
    queryFn: async () => {
      throw new Error('Not yet implemented in backend');
    },
    enabled: false,
  });
}

export function useCreateStockTake() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (locationId: string) => {
      throw new Error('Not yet implemented in backend');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.stockTakes] });
    },
  });
}

export function useGetExceptionReport(filters: any) {
  return useQuery({
    queryKey: QUERY_KEYS.exceptionReport(filters),
    queryFn: async () => {
      throw new Error('Not yet implemented in backend');
    },
    enabled: false,
  });
}
