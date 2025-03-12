export type RootParamList = {
  '(tabs)': undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  '/(tabs)/home': undefined;
  '/(tabs)/representatives': undefined;
  '/(tabs)/issues': undefined;
  '/(tabs)/forums': undefined;
  '/(tabs)/settings': undefined;
  'representative-details': { id: string };
};

// Navigation configuration
const config = {
  screens: {
    '(tabs)': {
      screens: {
        home: 'home',
        representatives: 'representatives',
        issues: 'issues',
        forums: 'forums',
        settings: 'settings'
      }
    },
    'sign-in': 'login',
    'sign-up': 'register',
    'representative-details': 'representative/:id'
  }
};

// Default export to fix the warning
export default config;
