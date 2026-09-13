# Marxia SMB Order Taker Guide

## Purpose

The Order Taker application is the restricted staff sales interface for an individual SMB tenant. It lets authorized staff select products, build an order, identify a client, apply the tenant's VAT setting, save unpaid orders locally, and mark an order as paid.

It is not the SMB management dashboard and must never expose Accounting, business settings, owner controls, or unrestricted inventory management.

## User flow

1. Staff enters the email and owner-issued authorization code.
2. Staff confirms the SMB owner's consent.
3. The interface opens only after the local authorization checks pass.
4. Staff selects products and quantities.
5. Staff may record client contact details, VAT, and an order reference.
6. **Save & New Order** stores an unpaid order in the device cache.
7. **Pending orders** restores unpaid work.
8. **Paid** records staff confirmation and removes the order from the pending list. It does not process a payment.

## SMB dashboard connection

| Order Taker reads from SMB services | Order Taker writes through SMB services |
|---|---|
| Authorized staff identity and active consent | Order and line-item records |
| Tenant-scoped products, images, prices, SKU, stock | Inventory reservation or decrement |
| Tenant tax configuration | Sales event and payment-status confirmation |
| Approved customers | Audit event with staff, tenant, time, and action |

The browser must not read or write another tenant's data directly. Production integration should use authenticated, tenant-scoped backend APIs with deny-by-default authorization. The SMB dashboard displays the resulting Orders, Inventory, Accounting, and Audit views; the Order Taker never receives dashboard privileges.

## Language support

- i18n.js provides English (en) and Spanish (es).
- The selected locale is stored under localStorage key marxia-language.
- Language controls are available in the order menu.
- Visible text, dynamic messages, placeholders, tooltips, and accessibility labels are localized.
- Customer-entered data, emails, phone numbers, order references, currency values, and identifiers are never translated.

## Current storage boundary

The MVP currently stores draft and pending orders on the staff device. This proves the interaction but is not authoritative synchronization. Before production, replace local-only order state with server-issued order IDs, idempotency keys, version checks, offline reconciliation, and immutable audit events.

## Security requirements

- Deny access unless tenant membership, staff status, consent, and role are valid.
- Enforce authorization on the backend; the HTML interface is not a security boundary.
- Never store authorization codes, access tokens, or payment data in translation files or local order records.
- Apply least-privilege RBAC for order creation, customer contact handling, payment confirmation, and void/refund actions.
- Log authorization, order creation, edits, payment confirmation, and session locking.
- Keep PCI payment processing outside this application unless a compliant hosted payment component is introduced.

## Verification checklist

- English → Spanish → English works without reload.
- The locale persists after reload.
- Login, menu, product, order, client, VAT, pending-order, dialog, toast, and accessibility text translate.
- Business-entered values remain unchanged.
- Refreshing does not lose valid pending orders.
- Marking one order paid does not remove another pending order.
- A staff member cannot access a different tenant or SMB dashboard functions.
