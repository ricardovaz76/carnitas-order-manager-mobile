# Carnitas Order Manager — Mobile App

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

The companion React Native/Expo app for restaurant staff and delivery drivers — the order board and delivery workflow that the [backend](https://github.com/ricardovaz76/order-manager-backend) feeds with parsed Messenger orders.

## Overview

Staff and drivers use this app to manage the day-to-day flow of an order after it's been received and parsed by the backend. Every order lands on the staff order board, with its ticket showing whether it's pickup or delivery, as determined by the backend's LLM. Staff assign a driver to delivery orders, which sends that order to the assigned driver's own delivery page. All staff have access to the app's delivery page, but since it only shows orders assigned to whoever is registered as a delivery driver, it's only meaningful to staff who've registered as a driver from the Drivers tab. The app talks directly to Supabase — not through the backend — using an authenticated session and Row Level Security, with live updates via Supabase realtime subscriptions.

## In Action

<!-- GIFs go here -->

## Features

- **Authentication**
  - Staff sign in with Supabase email/password authentication, using an account provisioned by an admin

- **Order Board**
  - Kanban-style board — New Orders / In the Kitchen / Ready for Pickup
  - Every order ticket shows whether it's pickup or delivery, as determined by the backend's LLM
  - Staff assign a driver to delivery orders, which sends the order to that driver's delivery page
  - New-order push alerts (opt-in)

- **Driver Registration**
  - Staff can register themselves as a delivery driver from the Drivers tab
  - Registered drivers can toggle their status to allow deliveries to be assigned to them

- **Delivery Page**
  - Accessible to all staff, but only useful to staff registered as a delivery driver
  - Each driver sees only their own assigned deliveries
  - Live-updates via a Supabase realtime subscription filtered to the driver's id
  - Tapping a delivery address opens Google Maps for directions
  - Can mark a delivery as delivered — no other status control
  - Delivery-assignment push alerts (mandatory) for whoever's assigned

## Tech Stack

- **Framework:** React Native (Expo)
- **Navigation:** expo-router
- **Styling:** StyleSheet
- **Backend/data:** Supabase (Postgres) — direct client access with Row Level Security and realtime subscriptions
- **Push notifications:** Expo push notifications (permission + token registration, app state listeners)
- **Testing:** Jest (`jest --ci`)
- **CI/CD:** GitHub Actions — automated Jest test run, plus OTA updates via `eas update` on merge to `main`
- **Build/Deploy:** EAS Build/Submit (manual, `production` profile) for native builds and store submissions

## Project Structure

```
.
├── .github/
│   └── workflows/   # CI: Jest test run, OTA update publish
├── assets/          # App icons, images
├── src/
│   ├── app/           # Screens and layouts (expo-router)
│   ├── components/    # UI components, organized by feature area
│   ├── hooks/         # Shared data-fetching and realtime hooks
│   ├── lib/           # Supabase client and other integrations
│   ├── styles/        # Shared style definitions
│   └── utils/         # Helper functions
└── tests/
    └── unit/        # mapDeliveries, mapDrivers, mapOrders, groupOrders — data-shaping utilities that structure queried Supabase data for display
```

## Getting Started

### Prerequisites

- Node.js
- Expo CLI / EAS CLI
- An Expo account (for `eas build`/`eas update`)
- Access to the project's Supabase instance (env vars)

### Installation

```bash
npm install
```

### Local Development

```bash
npx expo start
```

### Running Tests

```bash
jest --ci
```

## Deployment

JS/asset changes are shipped automatically as OTA updates via GitHub Actions (`eas update`, `production` channel) on merge to `main`. Native builds and app store submissions are manual:

```bash
eas build --platform android --profile production
eas build --platform ios --profile production
eas submit --platform android
eas submit --platform ios
```

Distributed privately via Google Play Internal Testing (Android) and TestFlight Internal Testing (iOS) — invite-only, no public listing.

## License

Distributed under the MIT License. See `LICENSE` for details.

## Contact
   
Ricardo Vazquez - [ricardo.vazquez2001@gmail.com](mailto:ricardo.vazquez2001@gmail.com)

## Related Repositories

- **[Backend](https://github.com/ricardovaz76/order-manager-backend)** — The AWS Lambda backend that receives Messenger orders and parses them with an LLM.