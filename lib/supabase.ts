// lib/supabase.ts
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Get environment variables safely
const getEnvVar = (key: string, fallback: string): string => {
  if (Platform.OS === 'web') {
    return process.env[`EXPO_PUBLIC_${key}`] || fallback;
  } else {
    return Constants.expoConfig?.extra?.[key] || fallback;
  }
};

// Initialize the Supabase client
export const supabase = createClient(
  getEnvVar('SUPABASE_URL', 'https://prputllaxnkhzavxmzuj.supabase.co'),
  getEnvVar('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycHV0bGxheG5raHphdnhtenVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MTEzMjEsImV4cCI6MjA1Njk4NzMyMX0.cuj3jzyiKtbjzXczriFY4_8Fm5gU_JCaXshYD7R10pg'),
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: Platform.OS === 'web',
    },
  }
);