import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, EstablishmentUser, DriverUser, AdminUser } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'establishment' | 'driver' | 'admin') => Promise<boolean>;
  register: (userData: any, userType: 'establishment' | 'driver') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('levaAli_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'establishment' | 'driver' | 'admin'): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock login logic
      if (userType === 'admin' && email === 'diegoamaronegocios@gmail.com' && password === 'Arapiraca2020%') {
        const adminUser: AdminUser = {
          id: 'admin-1',
          email,
          userType: 'admin',
          createdAt: new Date().toISOString()
        };
        setUser(adminUser);
        localStorage.setItem('levaAli_user', JSON.stringify(adminUser));
        return true;
      }

      // Mock user login for demo
      if (email && password) {
        let mockUser: User;
        
        if (userType === 'establishment') {
          mockUser = {
            id: 'est-1',
            email,
            userType: 'establishment',
            name: 'Restaurante Demo',
            establishmentName: 'Pizzaria do João',
            address: 'Rua das Flores, 123',
            neighborhood: 'Centro',
            city: 'São Paulo',
            balance: 50.00,
            isApproved: true,
            createdAt: new Date().toISOString()
          } as EstablishmentUser;
        } else {
          mockUser = {
            id: 'drv-1',
            email,
            userType: 'driver',
            name: 'João Silva',
            cpf: '123.456.789-00',
            dateOfBirth: '1995-05-15',
            balance: 0,
            isApproved: true,
            cancellationsToday: 0,
            createdAt: new Date().toISOString()
          } as DriverUser;
        }
        
        setUser(mockUser);
        localStorage.setItem('levaAli_user', JSON.stringify(mockUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any, userType: 'establishment' | 'driver'): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock registration logic
      let mockUser: User;
      
      if (userType === 'establishment') {
        mockUser = {
          id: `est-${Date.now()}`,
          email: userData.email,
          userType: 'establishment',
          name: userData.responsibleName,
          establishmentName: userData.establishmentName,
          cpfCnpj: userData.cpfCnpj,
          address: userData.address,
          houseNumber: userData.houseNumber,
          referencePoint: userData.referencePoint,
          neighborhood: userData.neighborhood,
          city: userData.city,
          balance: 0,
          isApproved: true, // Auto-approval for establishments
          createdAt: new Date().toISOString()
        } as EstablishmentUser;
      } else {
        mockUser = {
          id: `drv-${Date.now()}`,
          email: userData.email,
          userType: 'driver',
          name: userData.fullName,
          cpf: userData.cpf,
          dateOfBirth: userData.dateOfBirth,
          balance: 0,
          isApproved: false, // Manual approval required
          cancellationsToday: 0,
          createdAt: new Date().toISOString()
        } as DriverUser;
      }
      
      setUser(mockUser);
      localStorage.setItem('levaAli_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('levaAli_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}