import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth';

export default function SignInScreen() {
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setError('');
      await signIn(nationalId, password);
      replace('/(tabs)');
    } catch (err) {
      setError('Invalid national ID or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="National ID"
          value={nationalId}
          onChangeText={setNationalId}
          keyboardType="number-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <Link href="/sign-up" style={styles.link}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  error: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#ef4444',
    marginBottom: 16,
  },
  input: {
    fontFamily: 'Inter-Regular',
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  button: {
    backgroundColor: '#0891b2',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    fontSize: 16,
  },
  link: {
    alignItems: 'center',
  },
  linkText: {
    fontFamily: 'Inter-Regular',
    color: '#0891b2',
    fontSize: 14,
  },
});