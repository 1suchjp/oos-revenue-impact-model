# oos-revenue-impact-model
An end-to-end pipeline analyzing SKU stockouts and estimating theoretical revenue impact using Shopify API, Node.js integration, Google Apps Script automation, and forecast models.

Month-over-Month Stockout Revenue Impact Model

**Overview**

This project models the theoretical revenue impact of product stockouts across multiple brands and sales channels. 

The goal was: quantify how much revenue may have been lost when SKUs became unavailable for sale on the website and present that impact withinin a month-over-month (MoM) analytical framework.

The model uses forecasted demand and stock availability to estimate the financial exposure associated with inventory stockouts. Historical sales data was not used due to volatility in the Hemp derived THC and consumer CBD market segment (ie., unreliable proxy for future demand).

The resulting system transforms inventory events into clear financial metrics and allows for stockout severity to be evaluated in terms executives can immediately understand: **potential lost revenue**.

**NOTE** - The model assumes demand is evenly distributed across days within a month. Though it does not capture short-term demand variability, it provides a consistent framework for estimating relative revenue exposure across SKUs, channels, and time periods.

## System Architecture
```
Shopify
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

The Apps Script runs daily and records any SKU with zero available inventory across all sales channels.

![Stockout Detection Log](oos%20detection%20log.png)

## Revenue Exposure Model

Daily out-of-stock events are aggregated into SKU-level revenue exposure estimates across sales channels.

The model organizes revenue impact by month and sales channel. This allows leadership to quantify potential lost sales attributable to stockouts.

![Revenue Exposure Model](docs/images/revenue_model_structure.png)
