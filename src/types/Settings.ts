export interface AppSettings {
  pricePerKm: number;
  commissionPercentage: number;
  cancellationFee: number;
  withdrawalFee: number;
  paymentDay: number; // Day of week (0-6, Wednesday = 3)
  withdrawalFeeEnabled: boolean;
  appName: string;
  appLogo?: string;
}