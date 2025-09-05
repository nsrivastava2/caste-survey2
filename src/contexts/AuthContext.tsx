import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@punjab.gov.in',
    phone: '+91-9876543210',
    role: 'admin',
    location: {},
    isActive: true,
    createdAt: '2024-01-01',
    lastActive: '2024-12-19'
  },
  {
    id: '2',
    name: 'State Officer',
    email: 'state@punjab.gov.in',
    phone: '+91-9876543211',
    role: 'state',
    location: { state: 'Punjab' },
    isActive: true,
    createdAt: '2024-01-01',
    lastActive: '2024-12-19'
  },
  {
    id: '3',
    name: 'District Officer',
    email: 'district@punjab.gov.in',
    phone: '+91-9876543212',
    role: 'district',
    location: { state: 'Punjab', district: 'Amritsar' },
    isActive: true,
    createdAt: '2024-01-01',
    lastActive: '2024-12-19'
  },
  {
    id: '4',
    name: 'Ward Officer',
    email: 'ward@punjab.gov.in',
    phone: '+91-9876543213',
    role: 'ward',
    location: { state: 'Punjab', district: 'Amritsar', ward: 'Ward 1' },
    isActive: true,
    createdAt: '2024-01-01',
    lastActive: '2024-12-19'
  },
  {
    id: '5',
    name: 'Field Surveyor',
    email: 'surveyor@punjab.gov.in',
    phone: '+91-9876543214',
    role: 'surveyor',
    location: { state: 'Punjab', district: 'Amritsar', ward: 'Ward 1', village: 'Village A' },
    isActive: true,
    createdAt: '2024-01-01',
    lastActive: '2024-12-19'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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