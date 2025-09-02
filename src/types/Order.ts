export interface Order {
  id: string;
  establishmentId: string;
  driverId?: string;
  establishmentName: string;
  establishmentAddress: string;
  deliveryAddress: string;
  deliveryNeighborhood: string;
  deliveryCity: string;
  distance: number;
  basePrice: number;
  returnTrip: boolean;
  returnPrice: number;
  totalPrice: number;
  commission: number;
  driverEarnings: number;
  paymentMethod: 'paid' | 'cash' | 'card_machine';
  cashDetails?: {
    orderValue: number;
    customerPayment: number;
    change: number;
  };
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;
  acceptedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}