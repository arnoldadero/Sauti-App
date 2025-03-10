import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

// Initialize the Supabase client
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://prputllaxnkhzavxmzuj.supabase.co',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycHV0bGxheG5raHphdnhtenVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MTEzMjEsImV4cCI6MjA1Njk4NzMyMX0.cuj3jzyiKtbjzXczriFY4_8Fm5gU_JCaXshYD7R10pg',
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: Platform.OS === 'web',
    },
  }
);