# Specification

## Summary
**Goal:** Define the core backend data model and API, plus frontend wireframes, project structure, user stories, and a consistent enterprise UI theme for an HU (Handling Unit) Management System.

**Planned changes:**
- Create a clean persistent data schema (Motoko stable types/records + storage collections) covering users/roles, locations, HU types, Gate Pass (header + HU-type quantities), receipt confirmation, DC security confirmation, inventory balances (Crates/Shipper Boxes only), stock take (sessions/lines/reason codes), exception records, and audit events.
- Design a Motoko actor API for authentication/identity mapping, location context, GP creation (system GP number/date), pending GP listing (ascending GP number), receiving confirmation, security confirmation (Crate/Shipper Box only), inventory queries (OH + in-transit), stock take create/submit/approve, exception and reconciliation reports, audit trail queries, and structured export-ready report data.
- Produce text-based UI wireframes for role-based navigation and key screens (login/location, GP create/detail, pending GP receive flow, security confirmation, inventory dashboard, exception report, stock take, reconciliation report, audit trail), including negative-inventory warning/confirmation UX for GP creation.
- Provide a full project folder/module structure for a single-actor Motoko backend and React+TypeScript frontend, including guidance to avoid modifying immutable frontend paths.
- Write user stories (with given/when/then acceptance criteria) for core workflows and business rules, including role permissions and reporting/export expectations.
- Define and apply a coherent enterprise visual theme across the frontend (forms, tables, badges, filter panels) avoiding blue/purple as primary colors.

**User-visible outcome:** A documented blueprint of the HU Management System (schema, API contracts, UI wireframes/navigation, project structure, and user stories) that supports Gate Pass workflows, confirmations, inventory visibility (Crates/Shipper Boxes), stock take/reconciliation, exception reporting, and audit trail review with role-based access.
