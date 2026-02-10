import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    appRoles: Array<AppRole>;
    name: string;
    assignedLocationIds: Array<string>;
}
export enum AppRole {
    DEO = "DEO",
    Auditor = "Auditor",
    Security = "Security",
    LossPreventionOfficer = "LossPreventionOfficer",
    Operations = "Operations",
    Receiver = "Receiver",
    InventoryController = "InventoryController"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignUserProfile(user: Principal, profile: UserProfile): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
