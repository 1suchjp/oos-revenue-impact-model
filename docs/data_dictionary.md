# Data Dictionary

This project detects SKU stockouts across multiple Shopify sales channels and logs daily inventory availability snapshots used to estimate revenue impact.

## Input Dashboards

The Apps Script reads inventory availability from the following Google Sheets tabs:

| Dashboard | Description | SKU Column | Quantity Column |
|----------|-------------|------------|----------------|
| siteimportdtc | Cycling Frog DTC inventory | B | C |
| siteimportb2b | Cycling Frog B2B inventory | A | D |
| siteimportlnb2b | Lazarus Naturals B2B inventory | A | B |
| siteimportlndtc | Lazarus Naturals DTC inventory | A | B |

## Output Table

Stockout events are logged to sheet **Zero Snapshot Log New**

Within, each row represents a SKU that was out of stock at the daily snapshot time.

| Column | Description |
|------|-------------|
| Timestamp | Date/time snapshot was recorded |
| Month | Month key used for MoM aggregation |
| Dashboard | Source inventory dashboard |
| SKU | Product SKU |
| Channel Header | Inventory column header |
| Value | Quantity value detected (0) |

## Aggregation Layer

Downstream, a data QUERY aggregation calculate:

- Days out of stock per SKU
- Stockouts by sales channel
- Monthly stockout counts

These values are used to estimate theoretical revenue impact based on forecast demand and MSRP.
