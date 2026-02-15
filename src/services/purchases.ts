// RevenueCat Service - Stub Implementation
// Replace with actual RevenueCat SDK integration when API keys are available

import { Platform } from 'react-native';

// These would come from RevenueCat dashboard in production
const REVENUECAT_API_KEY = 'REPLACE_WITH_YOUR_API_KEY';

export const ENTITLEMENTS = {
  PREMIUM: 'premium',
};

export const PRODUCTS = {
  MONTHLY: 'fraudshield_monthly',
  YEARLY: 'fraudshield_yearly',
};

export interface Offering {
  id: string;
  products: Product[];
}

export interface Product {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  period: string;
}

export interface PurchaserInfo {
  entitlements: {
    [key: string]: {
      isActive: boolean;
      expirationDate?: string;
    };
  };
}

// Mock offerings for the paywall
export const MOCK_OFFERINGS: Offering[] = [
  {
    id: 'premium',
    products: [
      {
        id: PRODUCTS.MONTHLY,
        title: 'FraudShield Premium',
        price: '$4.99',
        priceValue: 4.99,
        period: 'month',
      },
      {
        id: PRODUCTS.YEARLY,
        title: 'FraudShield Premium',
        price: '$39.99',
        priceValue: 39.99,
        period: 'year',
      },
    ],
  },
];

class RevenueCatService {
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    // In production, initialize RevenueCat SDK:
    // await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
    
    this.initialized = true;
    console.log('RevenueCat initialized (stub)');
  }

  async getOfferings(): Promise<Offering[]> {
    await this.initialize();
    return MOCK_OFFERINGS;
  }

  async getPurchaserInfo(): Promise<PurchaserInfo | null> {
    await this.initialize();
    
    // In production: return await Purchases.getPurchaserInfo();
    return null;
  }

  async purchaseProduct(productId: string): Promise<boolean> {
    await this.initialize();
    
    // In production:
    // const { product } = offerings.find(p => p.id === productId);
    // const { purchaserInfo } = await Purchases.purchaseProduct(product);
    // return purchaserInfo.entitlements[ENTITLEMENTS.PREMIUM]?.isActive;
    
    console.log('Purchase requested (stub):', productId);
    return false;
  }

  async restorePurchases(): Promise<PurchaserInfo | null> {
    await this.initialize();
    
    // In production: return await Purchases.restoreTransactions();
    return null;
  }

  isProMember(purchaserInfo: PurchaserInfo | null): boolean {
    if (!purchaserInfo) return false;
    return purchaserInfo.entitlements[ENTITLEMENTS.PREMIUM]?.isActive ?? false;
  }
}

export const revenueCat = new RevenueCatService();
export default revenueCat;
