# HU Management System - User Stories & Acceptance Criteria

## Overview
User stories with given/when/then acceptance criteria for all core workflows.

---

## Epic 1: Gate Pass Management

### Story 1.1: Create Gate Pass (DEO)
**As a** Data Entry Operator (DEO)  
**I want to** create a Gate Pass for HU movements  
**So that** I can track shipments from DC to stores

#### Acceptance Criteria:

**Given** I am logged in as a DEO with access to DC001  
**When** I navigate to "Create Gate Pass"  
**Then** I should see a form with:
- GP Date (system date, read-only)
- From Location dropdown (pre-filled with my location)
- To Location dropdown (list of stores)
- Shipping Reference text field
- HU quantity inputs for: Crate, Carton, Bag, Shipper Box, Other
- Total HU Quantity (auto-calculated)
- Create button

**Given** I fill in all required fields with valid data  
**When** I click "Create Gate Pass"  
**Then** the system should:
- Generate a unique GP number (e.g., GP-2026-000001)
- Save the GP with status "Created"
- Update inventory for Crate and Shipper Box (if applicable)
- Create an audit event
- Show success message with GP number
- Redirect to GP detail page

**Given** creating the GP will result in negative inventory  
**When** I click "Create Gate Pass"  
**Then** the system should:
- Show a warning dialog: "Creating this GP will result in negative inventory: Crate at DC001: -5 units. Do you want to proceed?"
- Provide "Cancel" and "Confirm & Create" buttons
- Only create the GP if I click "Confirm & Create"

---

### Story 1.2: View Pending Gate Passes (Receiver)
**As a** Receiver at a store  
**I want to** view all pending Gate Passes for my location  
**So that** I can prepare to receive incoming shipments

#### Acceptance Criteria:

**Given** I am logged in as a Receiver with access to STORE123  
**When** I navigate to "Pending Gate Passes"  
**Then** I should see a list of GPs with status "Pending Receipt" for STORE123  
**And** the list should be sorted by ascending GP number (chronological order)  
**And** each row should display: GP Number, Date, From Location, Status badge

**Given** there are no pending GPs for my location  
**When** I view the pending list  
**Then** I should see an empty state message: "No pending gate passes"

**Given** I click on a GP row  
**When** the GP detail page loads  
**Then** I should see:
- GP header information (number, date, from/to locations, shipping reference)
- Dispatched quantities by HU type
- Input fields to enter received quantities
- "Confirm Receipt" button

---

### Story 1.3: Confirm Receipt (Receiver)
**As a** Receiver  
**I want to** confirm the received quantities of HUs  
**So that** the system can track actual vs dispatched quantities

#### Acceptance Criteria:

**Given** I am viewing a pending GP detail page  
**When** I enter received quantities for each HU type  
**And** I click "Confirm Receipt"  
**Then** the system should:
- Update the GP status to "Received"
- Save received quantities for each HU type
- Update inventory for Crate and Shipper Box
- Generate exception records if received ≠ dispatched
- Create an audit event
- Show success message
- Remove the GP from my pending list

**Given** I enter received quantities that differ from dispatched  
**When** I confirm receipt  
**Then** the system should:
- Auto-generate an exception record for each HU type with variance
- Mark the exception as "Open"
- Make it visible in the Exception Report for LP review

---

## Epic 2: Security Confirmation

### Story 2.1: Confirm Returned HUs at DC Gate (Security)
**As a** DC Security personnel  
**I want to** confirm returned Crates and Shipper Boxes at the main gate  
**So that** inventory is accurately updated when items return from stores

#### Acceptance Criteria:

**Given** I am logged in as Security at DC001 main gate  
**When** I navigate to "Security Confirmation"  
**Then** I should see a form with:
- GP Number dropdown (list of GPs with returns to this DC)
- Crate quantity input
- Shipper Box quantity input (only these two HU types)
- "Confirm Security Check" button

**Given** I select a GP and enter confirmed quantities  
**When** I click "Confirm Security Check"  
**Then** the system should:
- Save security confirmation record
- Update inventory for Crate and Shipper Box at DC001
- Create an audit event
- Show success message

**Given** I try to confirm a GP that is not a return to a DC  
**When** I attempt to submit  
**Then** the system should show an error: "Security confirmation only applies to DC locations"

---

## Epic 3: Inventory Management

### Story 3.1: View Inventory Dashboard (Operations)
**As an** Operations team member  
**I want to** view current inventory levels by location  
**So that** I can monitor stock levels and plan replenishments

#### Acceptance Criteria:

**Given** I am logged in as Operations  
**When** I navigate to "Inventory Dashboard"  
**Then** I should see:
- Location selector dropdown
- "On Hand Inventory" section showing Crate and Shipper Box quantities
- "In-Transit" section showing GPs in transit with HU quantities
- "Export Report" button

**Given** I select a specific location (e.g., DC001)  
**When** the dashboard loads  
**Then** I should see:
- Current OH for Crate and Shipper Box at DC001
- Status indicator (Normal / Low / Negative)
- In-transit GPs destined for DC001

**Given** inventory is negative  
**When** I view the dashboard  
**Then** the negative quantity should be displayed in red with a warning icon

---

### Story 3.2: View In-Transit Inventory (Operations)
**As an** Operations team member  
**I want to** view in-transit inventory  
**So that** I can track HUs currently being shipped

#### Acceptance Criteria:

**Given** I am viewing the Inventory Dashboard  
**When** I scroll to the "In-Transit" section  
**Then** I should see a table with columns:
- GP Number
- From Location
- To Location
- Crate Quantity
- Shipper Box Quantity
- GP Date

**Given** there are no in-transit GPs  
**When** I view the section  
**Then** I should see: "No in-transit inventory"

---

## Epic 4: Stock Take & Reconciliation

### Story 4.1: Create Stock Take (Inventory Controller)
**As an** Inventory Controller  
**I want to** create a stock take session  
**So that** I can reconcile physical inventory with system records

#### Acceptance Criteria:

**Given** I am logged in as Inventory Controller with access to DC001  
**When** I navigate to "Stock Take" and click "Create Stock Take"  
**Then** the system should:
- Create a new stock take with status "Draft"
- Generate a unique stock take ID (e.g., ST-2026-001)
- Capture current system OH for Crate and Shipper Box
- Show the stock take form

**Given** there is already an active stock take for DC001  
**When** I try to create another  
**Then** the system should show an error: "Only one active stock take allowed per location"

---

### Story 4.2: Submit Stock Take (Inventory Controller)
**As an** Inventory Controller  
**I want to** submit physical counts with variance reasons  
**So that** the stock take can be reviewed and approved

#### Acceptance Criteria:

**Given** I am viewing a draft stock take  
**When** I enter physical quantities for Crate and Shipper Box  
**And** I click "Submit for Approval"  
**Then** the system should:
- Calculate variance (physical - system) for each HU type
- Require a reason code if variance ≠ 0
- Change status to "Submitted"
- Create an audit event
- Show success message

**Given** I have a variance but do not provide a reason code  
**When** I try to submit  
**Then** the system should show an error: "Reason code required for variance"

---

### Story 4.3: Approve Stock Take (Admin / Inventory Controller)
**As an** Admin or Inventory Controller (different from creator)  
**I want to** approve a submitted stock take  
**So that** inventory is updated to reflect physical counts

#### Acceptance Criteria:

**Given** I am viewing a submitted stock take  
**When** I review the variance summary  
**And** I click "Approve & Update Inventory"  
**Then** the system should:
- Update inventory balances for Crate and Shipper Box
- Change status to "Approved"
- Create an audit event
- Show success message

**Given** I am the same user who created the stock take  
**When** I try to approve it  
**Then** the system should show an error: "Cannot approve your own stock take"

---

## Epic 5: Exception & Reporting

### Story 5.1: View Exception Report (Loss Prevention Officer)
**As a** Loss Prevention Officer  
**I want to** view exception/mismatch reports  
**So that** I can investigate discrepancies

#### Acceptance Criteria:

**Given** I am logged in as LP Officer  
**When** I navigate to "Exception Report"  
**Then** I should see:
- Filter panel with: From Date, To Date, Location, HU Type, Status
- "Apply Filters" button
- "Export CSV" button
- Data table with columns: GP Number, Location, HU Type, Dispatched, Received, Variance

**Given** I apply filters (e.g., date range, location)  
**When** I click "Apply Filters"  
**Then** the table should update to show only matching exception records

**Given** there are exception records  
**When** I click "Export CSV"  
**Then** the system should download a CSV file with all filtered records

---

### Story 5.2: View Reconciliation Report (Operations)
**As an** Operations team member  
**I want to** view GP-wise reconciliation reports  
**So that** I can track dispatched vs received quantities over time

#### Acceptance Criteria:

**Given** I am logged in as Operations  
**When** I navigate to "Reconciliation Report"  
**Then** I should see:
- Filter panel with: From Date, To Date, Location
- "Apply Filters" button
- "Export Excel" and "Export PDF" buttons
- Data table with columns: GP Number, Date, Crate Dispatched, Crate Received, Shipper Box Dispatched, Shipper Box Received

**Given** I apply filters  
**When** I click "Apply Filters"  
**Then** the table should show GP-wise data for the selected date range and location

**Given** I click "Export Excel"  
**When** the export completes  
**Then** I should receive an Excel file with all filtered data

---

### Story 5.3: View Shrinkage Report (Loss Prevention Officer)
**As a** Loss Prevention Officer  
**I want to** view shrinkage reports  
**So that** I can identify locations with inventory losses

#### Acceptance Criteria:

**Given** I am logged in as LP Officer  
**When** I navigate to "Shrinkage Report"  
**Then** I should see:
- Filter panel with: From Date, To Date, Location
- "Apply Filters" button
- "Export CSV" button
- Data table with columns: Location, HU Type, System OH, Physical OH, Variance

**Given** I apply filters  
**When** I click "Apply Filters"  
**Then** the table should show shrinkage data for the selected period

**Given** there is shrinkage  
**When** I view the report  
**Then** negative variances should be highlighted in red

---

## Epic 6: Audit Trail

### Story 6.1: View Audit Trail (Auditor)
**As an** Auditor  
**I want to** view complete audit trails  
**So that** I can ensure compliance and investigate issues

#### Acceptance Criteria:

**Given** I am logged in as Auditor  
**When** I navigate to "Audit Trail"  
**Then** I should see:
- Filter panel with: From Date, To Date, Entity Type, User
- "Apply Filters" button
- "Export CSV" button
- Data table with columns: Timestamp, User, Action, Entity Type, Entity ID, Details

**Given** I apply filters  
**When** I click "Apply Filters"  
**Then** the table should show only matching audit events

**Given** I click on an audit event row  
**When** the detail view opens  
**Then** I should see full event details including before/after values (if applicable)

---

## Epic 7: User Management & Authorization

### Story 7.1: First-Time Profile Setup
**As a** new user logging in for the first time  
**I want to** set up my profile  
**So that** I can access the system

#### Acceptance Criteria:

**Given** I log in with Internet Identity for the first time  
**When** the system checks my profile  
**Then** I should see a profile setup modal with:
- Name input field
- "Continue" button

**Given** I enter my name and click "Continue"  
**When** the profile is saved  
**Then** the system should:
- Save my profile with name
- Close the modal
- Show the main dashboard (based on my assigned roles)

**Given** I log in again after profile setup  
**When** the system checks my profile  
**Then** I should NOT see the profile setup modal again

---

### Story 7.2: Role-Based Navigation
**As a** user with specific roles  
**I want to** see only the modules I have access to  
**So that** I am not confused by irrelevant features

#### Acceptance Criteria:

**Given** I am logged in as a DEO  
**When** I view the sidebar navigation  
**Then** I should see only: "Gate Passes", "My GPs"

**Given** I am logged in as a Receiver  
**When** I view the sidebar navigation  
**Then** I should see only: "Pending GPs", "Receive Confirmation"

**Given** I am logged in as an Admin  
**When** I view the sidebar navigation  
**Then** I should see all modules including "User Management"

---

### Story 7.3: Location Context Selection
**As a** user assigned to multiple locations  
**I want to** select my current working location  
**So that** I see relevant data for that location

#### Acceptance Criteria:

**Given** I am assigned to multiple locations (DC001, STORE123)  
**When** I log in  
**Then** I should see a location selector in the header

**Given** I select a location from the dropdown  
**When** the selection is saved  
**Then** all data views should filter to that location

**Given** I am assigned to only one location  
**When** I log in  
**Then** the location should be auto-selected and the selector hidden

---

## Business Rules Summary

### Mandatory Rules:
1. **GP Creation**: Mandatory for all HU movements
2. **Pending List Ordering**: Ascending GP number (chronological)
3. **Inventory Tracking**: Only for Crate and Shipper Box
4. **Security Confirmation**: Mandatory for all DC locations for returned Crates/Shipper Boxes
5. **Mismatch Handling**: Auto-generate exception records when dispatched ≠ received
6. **Negative Inventory**: GP creation allowed with user confirmation
7. **Stock Take Variance**: Reason code mandatory if variance ≠ 0
8. **Audit Trail**: Complete logging of all GP-related transactions

### Validation Rules:
- GP number must be unique (system-generated)
- Total HU quantity must be > 0
- From/To locations must exist and be active
- User must have access to the location
- Receiver can only confirm GPs for their location
- Security can only confirm at DC locations
- Stock take approval requires different user than creator

---

## Reporting Requirements

### Required Filters:
- **Date Range**: From Date, To Date (all reports)
- **Location**: Single or multiple location selection
- **HU Type**: Filter by specific HU type
- **Status**: Filter by status (GP, Exception, Stock Take)

### Required Columns:
- **Exception Report**: GP Number, Location, HU Type, Dispatched, Received, Variance, Status
- **Reconciliation Report**: GP Number, Date, Crate Dispatched, Crate Received, Shipper Box Dispatched, Shipper Box Received, Current OH
- **Shrinkage Report**: Location, HU Type, System OH, Physical OH, Variance, Shrinkage %
- **Audit Trail**: Timestamp, User, Action, Entity Type, Entity ID, Details

### Export Formats:
- CSV (all reports)
- Excel (reconciliation report)
- PDF (reconciliation report)
