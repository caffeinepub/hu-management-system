# Feature Modules

This directory contains feature-specific modules for the HU Management System.

## Structure

Each feature module follows a consistent pattern:
- **Pages**: Main page components
- **Components**: Feature-specific UI components
- **Hooks**: React Query hooks for data fetching and mutations

## Features

### 1. Gate Pass (`gatepass/`)
- Create new gate passes
- View gate pass details
- List user's gate passes

### 2. Receiving (`receiving/`)
- View pending gate passes for receiving location
- Confirm receipt of HUs

### 3. Security (`security/`)
- Confirm returned Crates and Shipper Boxes at DC main gate

### 4. Inventory (`inventory/`)
- View inventory on-hand by location
- View in-transit inventory

### 5. Stock Take (`stocktake/`)
- Create stock take sessions
- Submit physical counts with variance reasons
- Approve stock takes

### 6. Reports (`reports/`)
- Exception/mismatch reports
- GP-wise reconciliation reports
- Shrinkage reports

### 7. Audit (`audit/`)
- View complete audit trail
- Filter and export audit events

## Usage Pattern

