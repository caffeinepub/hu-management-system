/**
 * Client-side Export Utilities
 * Transform structured report data into CSV-compatible rows
 */

/**
 * Convert array of objects to CSV string
 */
export function arrayToCSV(data: any[], headers?: string[]): string {
  if (data.length === 0) return '';

  const keys = headers || Object.keys(data[0]);
  const csvRows: string[] = [];

  // Add header row
  csvRows.push(keys.join(','));

  // Add data rows
  for (const row of data) {
    const values = keys.map(key => {
      const value = row[key];
      // Escape commas and quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value ?? '';
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

/**
 * Download CSV file
 */
export function downloadCSV(data: any[], filename: string, headers?: string[]): void {
  const csv = arrayToCSV(data, headers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Format date for export
 */
export function formatDateForExport(timestamp: number): string {
  const date = new Date(timestamp / 1000000); // Convert nanoseconds to milliseconds
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Format timestamp for export
 */
export function formatTimestampForExport(timestamp: number): string {
  const date = new Date(timestamp / 1000000);
  return date.toLocaleString();
}

/**
 * Export exception report to CSV
 */
export function exportExceptionReport(data: any[]): void {
  const formatted = data.map(row => ({
    'GP Number': row.gpNumber,
    'Location': row.locationId,
    'HU Type': row.huType,
    'Dispatched': row.dispatchedQty,
    'Received': row.receivedQty,
    'Variance': row.varianceQty,
    'Status': row.status,
    'Created': formatDateForExport(row.createdAt),
  }));

  downloadCSV(formatted, `exception-report-${Date.now()}.csv`);
}

/**
 * Export reconciliation report to CSV
 */
export function exportReconciliationReport(data: any[]): void {
  const formatted = data.map(row => ({
    'GP Number': row.gpNumber,
    'Date': formatDateForExport(row.gpDate),
    'From': row.fromLocationId,
    'To': row.toLocationId,
    'Crates Dispatched': row.cratesDispatched,
    'Crates Received': row.cratesReceived,
    'Shipper Boxes Dispatched': row.shipperBoxesDispatched,
    'Shipper Boxes Received': row.shipperBoxesReceived,
  }));

  downloadCSV(formatted, `reconciliation-report-${Date.now()}.csv`);
}

/**
 * Export shrinkage report to CSV
 */
export function exportShrinkageReport(data: any[]): void {
  const formatted = data.map(row => ({
    'Location': row.locationName,
    'HU Type': row.huType,
    'System OH': row.systemOH,
    'Physical OH': row.physicalOH,
    'Variance': row.varianceQty,
    'Shrinkage %': row.shrinkagePercent.toFixed(2),
  }));

  downloadCSV(formatted, `shrinkage-report-${Date.now()}.csv`);
}

/**
 * Export audit trail to CSV
 */
export function exportAuditTrail(data: any[]): void {
  const formatted = data.map(row => ({
    'Timestamp': formatTimestampForExport(row.performedAt),
    'User': row.performedBy,
    'Action': row.eventType,
    'Entity Type': row.entityType,
    'Entity ID': row.entityId,
    'Details': row.details,
  }));

  downloadCSV(formatted, `audit-trail-${Date.now()}.csv`);
}

/**
 * Extension point for XLSX/PDF generation
 * These would require additional libraries (e.g., xlsx, jspdf)
 * Left as placeholders for future implementation
 */
export function exportToExcel(data: any[], filename: string): void {
  // TODO: Implement XLSX export using a library like 'xlsx'
  console.warn('Excel export not yet implemented. Falling back to CSV.');
  downloadCSV(data, filename.replace('.xlsx', '.csv'));
}

export function exportToPDF(data: any[], filename: string): void {
  // TODO: Implement PDF export using a library like 'jspdf'
  console.warn('PDF export not yet implemented. Falling back to CSV.');
  downloadCSV(data, filename.replace('.pdf', '.csv'));
}
