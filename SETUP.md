# FraudShield - Setup Guide

## Prerequisites

Before running the app, ensure you have:

1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **npm or yarn** - Comes with Node.js
3. **Expo CLI** - Install globally: `npm install -g expo-cli`
4. **EAS CLI** - Install: `npm install -g eas-cli`
5. **Xcode** (Mac) or **Android Studio** (Windows/Linux) - For native builds

---

## Installation

```bash
# Navigate to the app directory
cd builds/fraudshield

# Install dependencies
npm install

# Start development server
npx expo start
```

### Running on Device/Simulator

**iOS (Mac):**
```bash
npx expo run:ios
```

**Android:**
```bash
npx expo run:android
```

**Web:**
```bash
npx expo start --web
```

---

## RevenueCat Setup

### 1. Create RevenueCat Account
- Go to [revenuecat.com](https://www.revenuecat.com)
- Sign up for free account

### 2. Create New Project
- Click "Create Project"
- Name: "FraudShield"
- Select platform: iOS (and Android if applicable)

### 3. Get API Key
- Navigate to **Project Settings → API Keys**
- Copy your **public** API key
- Add to `.env` file:
```
EXPO_PUBLIC_REVENUECAT_API_KEY=your_public_api_key_here
```

### 4. Create Products

In RevenueCat dashboard:

**Monthly Subscription:**
- Product ID: `fraudshield_monthly`
- Price: $4.99/month
- Duration: Monthly

**Yearly Subscription:**
- Product ID: `fraudshield_yearly`
- Price: $39.99/year
- Duration: Yearly

### 5. Configure Entitlements
- Go to **Products → Entitlements**
- Create entitlement: `premium`
- Add both products to this entitlement
- Enable for iOS and Android

### 6. Connect to App Store
- **iOS**: Connect via App Store Connect in RevenueCat
- **Android**: Connect via Google Play Console

---

## App Store Connect Setup

### 1. Create App
- Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- Navigate to **My Apps → + → New App**
- Fill in details:
  - Name: FraudShield
  - Bundle ID: com.fraudshield.app
  - Platform: iOS

### 2. Configure In-App Purchases
- Go to **Features → In-App Purchases**
- Create both subscriptions (must match RevenueCat product IDs)
- Submit for review

### 3. App Information
- Add screenshots (use Simulator: Cmd+S)
- Write descriptions, keywords
- Set age rating: 4+

### 4. Submit for Review
- Build must be uploaded via EAS or Xcode

---

## EAS Build Commands

### 1. Configure EAS
```bash
eas build:configure
```

### 2. Create Build Profile (eas.json)
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "scheme": "FraudShield"
      }
    }
  }
}
```

### 3. Build for Development (Android APK)
```bash
eas build -p android --profile preview
```

### 4. Build for App Store (iOS)
```bash
eas build -p ios --profile production
```

### 5. Submit to App Store
```bash
eas submit -p ios
```

---

## Submission Checklist

### Before Submitting

- [ ] RevenueCat products created and configured
- [ ] In-App Purchases set up in App Store Connect
- [ ] App icons created (1024x1024)
- [ ] Screenshots captured (6-10 images)
- [ ] Privacy policy URL ready
- [ ] App description written
- [ ] Keywords optimized (100 chars max)
- [ ] Age rating set
- [ ] Build uploaded via EAS

### App Store Metadata

- **App Name**: FraudShield (30 chars max)
- **Subtitle**: AI Fraud Protection (30 chars max)
- **Description**: 4,000 chars max
- **Keywords**: fraud, security, protection, bank, transaction, scam, alert, money (100 chars max)

### Screenshots Required

1. iPhone 6.7" (1290 x 2796)
2. iPhone 6.5" (1242 x 2688)
3. iPhone 5.5" (1242 x 2208)

---

## Testing

### Test RevenueCat Sandbox

1. Enable Sandbox mode on device:
   - Settings → App Store → Sandbox Account
2. Build with development profile
3. Use test accounts for purchases

### Test Flight (iOS)

1. Upload build via EAS
2. Wait for processing
3. Add testers in App Store Connect
4. Testers install via TestFlight app

---

## Troubleshooting

### Common Issues

**Build Fails:**
- Check Node version: `node -v` (need 18+)
- Clear cache: `rm -rf node_modules && npm install`
- Check Expo doctor: `npx expo doctor`

**RevenueCat Not Working:**
- Verify API key in .env
- Check product IDs match exactly
- Ensure entitlements configured

**App Crashes:**
- Check Metro bundler logs
- Verify all dependencies installed
- Try: `npx expo start --clear`

---

## Support

- Expo Documentation: https://docs.expo.dev
- RevenueCat Docs: https://docs.revenuecat.com
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
