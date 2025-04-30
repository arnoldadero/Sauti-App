# Tech Context

## Technologies Used
1. **Frontend**: React Native with Expo (TypeScript)
2. **Backend**: Supabase (PostgreSQL, Auth, Realtime)
3. **Maps**: MapLibre (open-source alternative to Mapbox)
4. **State Management**: React Context API
5. **Navigation**: React Navigation v6
6. **UI Components**: Native base (with custom components)

## Development Setup
1. **Framework**: Expo SDK 49
2. **Language**: TypeScript with strict mode
3. **Tools**: 
   - ESLint + Prettier for linting/formatting
   - Git for version control
   - VSCode with recommended extensions
4. **Dependencies**:
   - Supabase client library
   - React Native MapLibre module
   - Formik + Yup for form validation
   - React Query for data fetching

## Technical Constraints
1. **Mobile-First**: Must work on Android/iOS (Expo limitations)
2. **Offline Support**: Critical for rural areas with poor connectivity
3. **Map Performance**: Optimize for low-end devices
4. **Authentication**: Must support email/password with future social login expansion

## Tool Usage Patterns
1. **File Structure**: 
   - Feature-based routing (auth/tabs)
   - Component-driven development
2. **Code Organization**:
   - Hooks in /hooks
   - Shared types in /types.d.ts
   - Context providers in /contexts
3. **Map Implementation**:
   - Platform-specific files (native/web)
   - MapLibre API wrapper in components/MapView