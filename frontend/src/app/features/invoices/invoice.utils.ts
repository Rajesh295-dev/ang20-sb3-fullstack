import { InvoiceDetail } from './invoice.model';

export function calcSubtotal(inv: InvoiceDetail): number {
  return inv.items.reduce((sum, it) => sum + (it.total ?? 0), 0);
}

export function calcTax(inv: InvoiceDetail, subtotal?: number): number {
  const base = subtotal ?? calcSubtotal(inv);
  return (base * inv.taxRatePct) / 100;
}

export function calcGrandTotal(
  inv: InvoiceDetail,
  subtotal?: number,
  tax?: number,
): number {
  const s = subtotal ?? calcSubtotal(inv);
  const t = tax ?? calcTax(inv, s);
  return s + t;
}

/** Convenience: returns a copy with derived fields filled in */
export function withComputedTotals(inv: InvoiceDetail): InvoiceDetail {
  const subtotal = calcSubtotal(inv);
  const tax = calcTax(inv, subtotal);
  const grandTotal = subtotal + tax;
  return { ...inv, subtotal, tax, grandTotal };
}
