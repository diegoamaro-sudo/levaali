import React, { createContext, useContext, useState, useCallback } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  playSound: (type: 'order_received' | 'order_accepted' | 'delivery_completed' | 'money') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove after duration (default 5 seconds)
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const playSound = useCallback((type: 'order_received' | 'order_accepted' | 'delivery_completed' | 'money') => {
    // Mock sound implementation - would be replaced with actual audio files
    const soundMap = {
      order_received: 'beep-beep',
      order_accepted: 'ding',
      delivery_completed: 'chime',
      money: 'cash-register'
    };
    
    console.log(`🔊 Playing sound: ${soundMap[type]}`);
    
    // In production, would play actual audio:
    // const audio = new Audio(`/sounds/${type}.mp3`);
    // audio.play().catch(console.error);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      playSound
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}