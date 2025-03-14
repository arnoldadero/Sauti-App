# Sautii App

A mobile application built with React Native (Expo) for managing government representatives and civic engagement.

## Features
- Authentication flow (Sign In/Sign Up)
- Representatives directory with details
- Interactive maps integration (react-native-maps)
- Haptic feedback and system UI integration
- Supabase backend integration
- Cross-platform support (iOS, Android, Web)

## Technologies
- **Frontend**: React Native, Expo Router
- **State Management**: React Context API
- **Navigation**: React Navigation
- **Backend**: Supabase
- **Utilities**: Axios, Cheerio, Ethers

## Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Supabase account
- Google Maps API key (for maps functionality)

## Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create `.env` file with:
```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
GOOGLE_MAPS_API_KEY=your-maps-api-key
```

## Running the App
```bash
npm run dev
```

## Building for Web
```bash
npm run build:web
```

## Project Structure
```
/sautii-app
├── app/              # Expo Router app routes
├── assets/           # Static assets
├── contexts/         # React context providers
├── hooks/            # Custom hooks
├── lib/              # Shared utilities
└── types.d.ts        # TypeScript type definitions
```

## Application Structure

The application is organized under the `app` directory as follows:

- **(auth):** Contains authentication related screens such as sign-up and sign-in.
- **(tabs):** Hosts primary interface pages including forums and representatives.
- **Other files:
  - `+not-found.tsx`: Custom 404 page handling.
  - `_layout.tsx`: Layout configuration for the app.
  - `navigation.ts`: Manages the app's navigation structure.
  - `representative-details.tsx`: Provides detailed information about representatives.
  - `representatives.tsx`: Summarizes representative data.

All interactive elements use the custom `KenyanButton` component to provide a consistent Kenyan flag styled UI.

## Dependencies
- Core: React Native 0.76, Expo SDK 52
- Navigation: @react-navigation
- UI: @expo/vector-icons, lucide-react-native, KenyanButton
- State: @supabase/supabase-js
- Utilities: axios, ethers, cheerio

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License
[MIT](LICENSE)