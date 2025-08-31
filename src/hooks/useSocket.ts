import { useEffect, useRef } from 'react';

interface SocketMessage {
  type: string;
  data: any;
}

// Mock WebSocket hook for real-time features
export function useSocket(url: string, onMessage?: (message: SocketMessage) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // In production, would create real WebSocket connection
    // For now, mock with periodic updates
    
    const mockSocket = {
      send: (data: string) => {
        console.log('📡 Mock WebSocket send:', data);
      },
      close: () => {
        console.log('🔌 Mock WebSocket closed');
      }
    };

    socketRef.current = mockSocket as any;

    // Mock real-time updates
    const interval = setInterval(() => {
      if (onMessage) {
        // Simulate driver location updates
        onMessage({
          type: 'driver_location_update',
          data: {
            driverId: 'drv-1',
            lat: -23.5505 + (Math.random() - 0.5) * 0.001,
            lng: -46.6333 + (Math.random() - 0.5) * 0.001
          }
        });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, onMessage]);

  const sendMessage = (message: any) => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
}