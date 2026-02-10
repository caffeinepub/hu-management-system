# HU Management System - API Design

## Overview
This document defines the backend API (Motoko actor interface) for the HU Management System.

---

## Authentication & Authorization

### 1. User Profile Management

#### `getCallerUserProfile() : async ?UserProfile`
**Description**: Get the current user's profile  
**Authorization**: Authenticated users only  
**Returns**: UserProfile or null if not set up  
**Query**: Yes (read-only)

#### `saveCallerUserProfile(profile: UserProfile) : async ()`
**Description**: Save/update the current user's profile (first-time setup)  
**Authorization**: Authenticated users only  
**Request**: `{ name: Text, appRoles: [AppRole], assignedLocationIds: [Text] }`  
**Returns**: void  
**Errors**: "Unauthorized" if not authenticated

#### `assignUserProfile(user: Principal, profile: UserProfile) : async ()`
**Description**: Admin assigns profile and roles to a user  
**Authorization**: Admin only  
**Request**: `{ user: Principal, profile: UserProfile }`  
**Returns**: void  
**Errors**: "Unauthorized" if not admin

---

## Location Management

### 2. Location Operations

#### `createLocation(location: LocationInput) : async Text`
**Description**: Create a new location  
**Authorization**: Admin or InventoryController  
**Request**: `{ name: Text, locationType: LocationType }`  
**Returns**: Location ID  
**Errors**: "Unauthorized", "Location already exists"

#### `listLocations() : async [Location]`
**Description**: List all active locations  
**Authorization**: All authenticated users  
**Returns**: Array of Location  
**Query**: Yes

#### `getLocationById(id: Text) : async ?Location`
**Description**: Get location by ID  
**Authorization**: All authenticated users  
**Returns**: Location or null  
**Query**: Yes

---

## Gate Pass Operations

### 3. Gate Pass Creation

#### `createGatePass(input: CreateGatePassInput) : async Result<CreateGatePassResult, Text>`
**Description**: Create a new Gate Pass  
**Authorization**: DEO role, must have access to fromLocation  
**Request**:
