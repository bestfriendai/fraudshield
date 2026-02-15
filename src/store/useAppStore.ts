import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Transaction {
  id: string;
  merchant: string;
  amount: string;
  date: string;
  risk: 'low' | 'medium' | 'high';
}

interface Alert {
  id: string;
  type: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  read: boolean;
}

interface AppState {
  // User
  protectionScore: number;
  isPremium: boolean;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  
  // Alerts
  alerts: Alert[];
  markAlertRead: (id: string) => void;
  unreadAlertCount: number;
  
  // Settings
  protectionEnabled: boolean;
  pushNotifications: boolean;
  emailAlerts: boolean;
  
  // Actions
  setPremium: (value: boolean) => void;
  toggleProtection: () => void;
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  protectionScore: 94,
  isPremium: false,
  
  transactions: [
    { id: '1', merchant: 'Amazon', amount: '$47.99', date: 'Feb 14', risk: 'low' },
    { id: '2', merchant: 'Netflix', amount: '$15.99', date: 'Feb 13', risk: 'low' },
    { id: '3', merchant: 'Unknown', amount: '$299.00', date: 'Feb 12', risk: 'high' },
  ],
  
  alerts: [
    { id: '1', type: 'high', title: 'Unusual Transfer', description: '$299 blocked', read: false },
    { id: '2', type: 'medium', title: 'Pending Review', description: '$250 pending', read: false },
  ],
  
  protectionEnabled: true,
  pushNotifications: true,
  emailAlerts: true,
  
  // Computed
  unreadAlertCount: 2,
  
  // Actions
  addTransaction: (tx) => set((state) => ({
    transactions: [tx, ...state.transactions]
  })),
  
  markAlertRead: (id) => set((state) => ({
    alerts: state.alerts.map(a => a.id === id ? { ...a, read: true } : a),
    unreadAlertCount: state.alerts.filter(a => !a.read && a.id !== id).length,
  })),
  
  setPremium: (value) => set({ isPremium: value }),
  
  toggleProtection: () => set((state) => ({
    protectionEnabled: !state.protectionEnabled
  })),
  
  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem('fraudshield-state');
      if (data) {
        const parsed = JSON.parse(data);
        set(parsed);
      }
    } catch (e) {
      console.error('Failed to load state:', e);
    }
  },
  
  saveToStorage: async () => {
    try {
      const state = get();
      await AsyncStorage.setItem('fraudshield-state', JSON.stringify({
        protectionEnabled: state.protectionEnabled,
        pushNotifications: state.pushNotifications,
        emailAlerts: state.emailAlerts,
        isPremium: state.isPremium,
      }));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  },
}));
