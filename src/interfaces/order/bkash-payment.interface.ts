export interface IBkashPaymentExecuteResponse {
  orderId: string;
  merchantInvoiceNumber: string;
  paymentExecuteTime: string;
  paymentBkashNumber: string;
  paymentID: string;
  trxID: string;
  paymentPortal?: string;
}
