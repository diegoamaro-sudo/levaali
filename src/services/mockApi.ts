export interface MockDriver {
  lat: number;
  lng: number;
  id: string;
  name: string;
  isOnline: boolean;
}

export interface MockLocation {
  lat: number;
  lng: number;
  address: string;
}

// Mock data for map functionality
export const mockDrivers: MockDriver[] = [
  { id: 'drv-1', name: 'Carlos', lat: -23.5505, lng: -46.6333, isOnline: true },
  { id: 'drv-2', name: 'Ana', lat: -23.5525, lng: -46.6343, isOnline: true },
  { id: 'drv-3', name: 'Roberto', lat: -23.5515, lng: -46.6353, isOnline: true },
  { id: 'drv-4', name: 'Maria', lat: -23.5535, lng: -46.6323, isOnline: true },
  { id: 'drv-5', name: 'Pedro', lat: -23.5495, lng: -46.6313, isOnline: true },
];

// Mock API functions
export const calculateDistance = (from: MockLocation, to: MockLocation): number => {
  // Simple distance calculation (in km)
  const R = 6371; // Earth's radius in km
  const dLat = (to.lat - from.lat) * Math.PI / 180;
  const dLon = (to.lng - from.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const geocodeAddress = async (address: string): Promise<MockLocation> => {
  // Mock geocoding - in production would use Google Maps Geocoding API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    lat: -23.5505 + (Math.random() - 0.5) * 0.01,
    lng: -46.6333 + (Math.random() - 0.5) * 0.01,
    address
  };
};

export const findNearbyDrivers = (location: MockLocation, radiusKm: number = 1): MockDriver[] => {
  return mockDrivers.filter(driver => {
    if (!driver.isOnline) return false;
    
    const distance = calculateDistance(location, {
      lat: driver.lat,
      lng: driver.lng,
      address: ''
    });
    
    return distance <= radiusKm;
  });
};

export const processPayment = async (amount: number, method: 'pix' | 'qr_code'): Promise<boolean> => {
  // Mock payment processing - in production would use Mercado Pago API
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Math.random() > 0.1; // 90% success rate
};

export const sendNotification = async (userId: string, title: string, message: string): Promise<boolean> => {
  // Mock push notification - in production would use Firebase Cloud Messaging
  await new Promise(resolve => setTimeout(resolve, 300));
  console.log(`📱 Notification sent to ${userId}: ${title} - ${message}`);
  return true;
};