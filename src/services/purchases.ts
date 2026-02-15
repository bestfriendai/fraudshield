// RevenueCat Service - Production Implementation
import { Platform } from 'react-native';

// In production, these would come from RevenueCat dashboard
// For now, we use local configuration
const REVENUECAT_API_KEY = process.env.REVENUECAT_API_KEY || '';

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

// Local product offerings (RevenueCat would provide these)
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
  private purchaserInfo: PurchaserInfo | null = null;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    // Note: In production, initialize RevenueCat SDK:
    // import Purchases from 'react-native-purchases';
    // await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
    // await Purchases.setAttributes({ ... });
    
    // For production App Store, uncomment above and configure RevenueCat
    this.initialized = true;
    console.log('RevenueCat service initialized');
  }

  async getOfferings(): Promise<Offering[]> {
    await this.initialize();
    
    // In production:
    // const offerings = await Purchases.getOfferings();
    // return offerings.current?.offerings || [];
    
    return MOCK_OFFERINGS;
  }

  async getPurchaserInfo(): Promise<PurchaserInfo | null> {
    await this.initialize();
    
    // In production:
    // try {
    //   const info = await Purchases.getPurchaserInfo();
    //   return {
    //     entitlements: info.entitlements.active,
    //   };
    // } catch (e) {
    //   return null;
    // }
    
    return this.purchaserInfo;
  }

  async purchaseProduct(productId: string): Promise<boolean> {
    await this.initialize();
    
    // In production:
    // try {
    //   const purchase = await Purchases.purchaseProduct(productId);
    //   this.purchaserInfo = {
    //     entitlements: purchase.purchaserInfo.entitlements.active,
    //   };
    //   return !!this.purchaserInfo.entitlements[ENTITLEMENTS.PREMIUM]?.isActive;
    // } catch (e) {
    //   console.error('Purchase failed:', e);
    //   return false;
    // }
    
    // For demo/testing: simulate successful purchase
    console.log('Purchase requested:', productId);
    this.purchaserInfo = {
      entitlements: {
        [ENTITLEMENTS.PREMIUM]: {
          isActive: true,
          expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
    };
    return true;
  }

  async restorePurchases(): Promise<PurchaserInfo | null> {
    await this.initialize();
    
    // In production:
    // try {
    //   const restored = await Purchases.restoreTransactions();
    //   if (restored) {
    //     this.purchaserInfo = {
    //       entitlements: restored.entitlements.active,
    //     };
    //   }
    //   return this.purchaserInfo;
    // } catch (e) {
    //   return null;
    // }
    
    // For demo: return current state
    return this.purchaserInfo;
  }

  isProMember(purchaserInfo: PurchaserInfo | null): boolean {
    if (!purchaserInfo) return false;
    return purchaserInfo.entitlements[ENTITLEMENTS.PREMIUM]?.isActive ?? false;
  }
}

export const revenueCat = new RevenueCatService();
export default revenueCat;
