export interface IOrder {
  orderNumber: string;
  client: string;
  orderDate: string;
  estimatedCompletionDate: string;
  status: 'em confeccao' | 'finalizado' | 'enviado';
  trackingNumber?: string;
  trackingLink?: string;
  productName: string;
  queuePosition?: number | null;
}