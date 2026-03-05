function snapshotzerovalues() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Dashboards to check:
  // name = tab name
  // skuCol = SKU column index (1=A, 2=B, etc)
  // channels = qty column indexes to check for zero
  const dashboards = [
    { name: "siteimportdtc",   skuCol: 2, channels: [3] }, // SKU B, Qty C
    { name: "siteimportlnb2b", skuCol: 1, channels: [2] }, // SKU A, Qty B
    { name: "siteimportb2b",   skuCol: 1, channels: [4] }, // SKU A, Qty D
    { name: "siteimportlndtc", skuCol: 1, channels: [2] }, // SKU A, Qty B
  ];

  const logSheetName = "Zero Snapshot Log New";
  const desiredHeaders = ["Timestamp", "Month", "Dashboard", "SKU", "Channel Header", "Value"];

  let logSheet = ss.getSheetByName(logSheetName);

  // THis creates / normalizes teh log sheet
  if (!logSheet) {
    logSheet = ss.insertSheet(logSheetName);
    logSheet.appendRow(desiredHeaders);
  } else {
    // This will ensure Month column exists in position B
    const lastCol = Math.max(1, logSheet.getLastColumn());
    const headers = logSheet
      .getRange(1, 1, 1, lastCol)
      .getValues()[0]
      .map(h => String(h || "").trim());

    if (!headers.includes("Month")) {
      logSheet.insertColumnAfter(1); // after Timestamp
    }

    // This forces headers to A:F
    logSheet.getRange(1, 1, 1, desiredHeaders.length).setValues([desiredHeaders]);

    // This removes extra cols beyond F 
    const extraCols = logSheet.getLastColumn() - desiredHeaders.length;
    if (extraCols > 0) {
      logSheet.deleteColumns(desiredHeaders.length + 1, extraCols);
    }
  }

  // THis is for timestamp and month key
  const tz = ss.getSpreadsheetTimeZone();
  const now = new Date();
  const dateStamp = Utilities.formatDate(now, tz, "yyyy-MM-dd HH:mm");
  const monthKey = dateStamp.slice(0, 7); // yyyy-MM

  // Helpers
  const isZeroLike = (v) => v === 0 || (typeof v === "string" && v.trim() === "0");
  const normSku = (v) => (v == null ? "" : String(v).trim());

  dashboards.forEach((d) => {
    const sheet = ss.getSheetByName(d.name);
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    // This reads teh SKUs
    const skuValues = sheet
      .getRange(2, d.skuCol, lastRow - 1, 1)
      .getValues()
      .map(r => normSku(r[0]));

    const logRows = [];

    // For each qty column, this will log rows where qty is 0
    d.channels.forEach((col) => {
      const header = sheet.getRange(1, col).getValue();

      const channelValues = sheet
        .getRange(2, col, lastRow - 1, 1)
        .getValues()
        .map(r => r[0]);

      for (let i = 0; i < channelValues.length; i++) {
        const sku = skuValues[i];
        if (!sku) continue;

        const val = channelValues[i];
        if (isZeroLike(val)) {
          // Timestamp | Month | Dashboard | SKU | Channel Header | Value
          logRows.push([dateStamp, monthKey, d.name, sku, header, val]);
        }
      }
    });

    // This writes logs 
    if (logRows.length) {
      const startRow = logSheet.getLastRow() + 1;
      logSheet.getRange(startRow, 1, logRows.length, logRows[0].length).setValues(logRows);
    }
  });
}
