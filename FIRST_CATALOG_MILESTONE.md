# First catalog integration milestone

Status: Prepared specification; not implemented or deployed.

## Goal
One owner-authorized employee signs into Order Takers and reads one SMB branch catalog from the same backend used by the SMB dashboard. Admin Staff is not a prerequisite.

## Environment inputs needed
- Development Firebase/Google Cloud project ID and console URL, or confirmation no project exists.
- Development API base URL and backend repository, if available.
- Configured identity provider and permitted application origins.
- Development tenant ID, branch ID and employee UID with owner-approved membership.
- Non-production catalog records belonging to that branch.

Do not provide passwords, private keys or tokens. Project IDs and endpoint URLs are configuration, not authorization.

No Firebase/Google Cloud management connector was found in the available plugin search. No backend deployment configuration was found in the inspected main branches of smbs, smbs-ordertakers or exchange. A cloud project/backend may exist elsewhere.

## Proposed read flow
1. Authenticate through the configured identity provider; replace the static email/code gate for live mode.
2. GET /staff/session validates credentials and returns only active owner-approved memberships and permissions.
3. Select an authorized branch. URL and browser-storage values never prove membership.
4. GET /tenants/{tenantId}/locations/{locationId}/catalog checks membership and catalog permission on the server.
5. Display server product identity, image, SKU, price, currency, tax reference, available stock and version.
6. On denied, expired or unavailable responses, show the locked/error state. Never silently substitute sample data as live results.

Response envelope: tenantId, locationId, currency, updatedAt, dataVersion and items conforming to the Product Contract. Exclude salaries, private customer data, credentials and unrelated locations.

Choose token/session transport and cross-origin policy after inspecting the real deployment. Both apps must use verified server authorization. GitHub files and shared localStorage are not the business database.

## Acceptance checks
| Case | Required result |
|---|---|
| Authorized employee and assigned branch | Only the assigned catalog returned |
| Missing/expired credentials | Denied without catalog data |
| Valid user changes tenant to another SMB | Denied by server |
| User changes to unassigned branch | Denied by server |
| Owner suspends membership | Subsequent catalog request denied |
| Backend price/stock changes | Refresh displays updated version |
| Backend unavailable | Error; no fabricated live result |
| Reload | Session revalidated before catalog restoration |
| Logout or account/branch switch | Prior sensitive context/cache cleared |
| Repeated read | No order, stock or payment writes |

## Completion evidence
Record project, backend revision, API contract, authorized/denied results and screenshots. Tenant isolation must be tested on the server. Once these pass, proceed to centralized drafts and acceptance/reservations. Payment, fulfillment and recognition follow separately.

## Current boundary
Documentation only. No tooling installation, resource creation, user creation, deployment, authentication connection or payment processing is performed by this PR.
