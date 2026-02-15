# FraudShield

FraudShield is an Expo + React Native app for monitoring transactions, surfacing risk alerts, and managing fraud-protection settings.

## Getting Started

```bash
npm install
npx expo start
```

## Scripts

- `npx tsc --noEmit` — type-check the project
- `npx expo install --fix` — align package versions with the installed Expo SDK

## Project Structure

- `app/` — Expo Router screens (dashboard, transactions, alerts, settings, paywall)
- `src/store/` — Zustand app state
- `src/services/` — integrations (purchases/subscriptions)
- `src/ui/` — design system tokens (colors, spacing, typography)

## Notes

- Transactions and alerts tabs now render from shared store state (`useAppStore`) instead of inline mock arrays.
- Purchase offerings use a `DEFAULT_OFFERINGS` fallback when live RevenueCat offerings are unavailable.
