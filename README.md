# oos-revenue-impact-model

**An end-to-end operational analytics model that detects product stockouts and estimates potential revenue exposure across DTC and B2B e-commerce channels.**

Tech: Shopify | Google Sheets | Apps Script | Node.js | Matrixify

## Overview

This project models the theoretical revenue impact of product stockouts. It spans multiple brands and sales channels. 

The goal: quantify how much revenue may have been lost when SKUs became unavailable for sale on company website, and present that impact within a month-over-month (MoM) analytical framework.

The model uses forecasted demand and stock availability to estimate the financial exposure associated with inventory stockouts. Historical sales data was not used due to volatility in the Hemp derived THC and consumer CBD market segment (unreliable proxy for future demand).

The resulting system transforms inventory events into clear financial metrics and allows for stockout severity to be evaluated in terms executives can immediately understand: **potential lost revenue**.

**NOTE** - The model assumes demand is evenly distributed across all days in a month.

## Objective

The model estimates potential revenue exposure created when SKUs become temporarily unavailable for sale due to stockouts.

## System Architecture
```
Shopify (inventory source)
↓
Railway (Node.js automation layer)
↓
Matrixify (Shopify data export app)  
↓
Google Sheets (IMPORTDATA CSV grab of inventory snapshots)
↓
Apps Script (1x daily OOS detection)
↓
Aggregation Layer (QUERY based data normalization)
↓
MoM Revenue Impact Model
```

## Stockout Detection Log

Google Apps Script runs daily during peak sale activity, recording any SKU with zero available inventory across all sales channels. These are stockout "events".

![Stockout Detection Log](oos%20detection%20log.png)

## Revenue Exposure Model

Daily out-of-stock events are aggregated into SKU-level revenue exposure estimates across sales channels.

The model organizes revenue impact by month and sales channel. 

![Revenue Exposure Model](revenue_model_structure.png)

## Key Design Decisions

- Historical sales data was excluded due to volatility in the hemp-derived THC / CBD market segment.
- Daily inventory snapshots are used to detect stockout events across channels.
- Stockout events are aggregated into monthly SKU-level exposure estimates.

## Repository Structure

/scripts
  snapshotZeroValues.gs        – Apps Script used for daily stockout detection

/docs
  data_dictionary.md           – dataset documentation
