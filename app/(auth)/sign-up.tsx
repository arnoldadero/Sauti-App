import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/auth';

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name || !email || !idNumber || !password || !confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (!/^\d{8}$/.test(idNumber)) {
      setError('Please enter a valid ID number (8 digits)');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    try {
      setError('');
      
      if (!validateForm()) {
        return;
      }
      
      setLoading(true);
      
      await signUp({
        name,
        email,
        idNumber,
        password
      });
      
      router.replace('/');
    } catch (e) {
      setError(e.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Sauti to access government services</Text>
          
          {error ? <Text style={styles.error}>{error}</Text> : null}
          
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          
          <Text style={styles.inputLabel}>ID Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your national ID number"
            value={idNumber}
            onChangeText={setIdNumber}
            keyboardType="number-pad"
            maxLength={8}
          />
          
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Pressable 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
          </Pressable>

          <View style={styles.linkContainer}>
            <Link href="/sign-in" style={styles.link}>
              <Text style={styles.linkText}>Already have an account? Sign in</Text>
            </Link>
            
            <Link href="/forgot-password" style={styles.link}>
              <Text style={styles.linkText}>Forgot your password?</Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
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
  buttonDisabled: {
    backgroundColor: '#94a3b8',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    fontSize: 16,
  },
  linkContainer: {
    alignItems: 'center',
    gap: 10,
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