# System Patterns

## Architecture Overview
React Native with Expo framework using a component-based architecture with clear separation of concerns:
- Presentation layer: React components in app/(tabs) and components/ directories
- Data layer: Supabase integration in lib/supabase.ts
- State management: React Context API (auth.tsx) and local component state
- Navigation: React Navigation with grouped routing (auth/tabs)

## Key Technical Decisions
1. **Supabase Backend**: Chosen for real-time capabilities and ease of integration with React Native
2. **Map Implementation**: MapLibre-based components with platform-specific implementations
3. **Authentication**: Email/password with potential for social login expansion
4. **State Management**: Context API for global state with local component state for UI interactions

## Component Relationships
1. **Auth Flow**: 
   - (auth)/_layout.tsx → sign-in.tsx/sign-up.tsx → tabs routing
2. **Map Integration**:
   - MapView components → native/web implementations → MapLibre API
3. **Issue Reporting**:
   - issues.tsx → supabase integration → notification system

## Critical Implementation Paths
1. Authentication flow with Supabase
2. Location-based issue reporting with map integration
3. Real-time data synchronization with backend
4. Offline functionality implementation