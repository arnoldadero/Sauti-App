import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { Bell, Shield, Wallet, Globe as Globe2, CircleHelp as HelpCircle, ChevronRight, LogOut } from 'lucide-react-native';
import { useAuth } from '@/contexts/auth';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode
  ) => (
    <Pressable style={styles.settingItem}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight size={20} color="#64748b" />}
    </Pressable>
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.signInPrompt}>
          <Text style={styles.signInText}>Please sign in to access settings</Text>
          <Pressable
            style={styles.signInButton}
            onPress={() => router.push('/sign-in')}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.profileName}>
              {user.email?.split('@')[0] || 'User'}
            </Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {renderSettingItem(
          <Bell size={24} color="#475569" />,
          'Notifications',
          'Manage your notification preferences',
          <Switch value={true} onValueChange={() => {}} />
        )}
        {renderSettingItem(
          <Shield size={24} color="#475569" />,
          'Privacy',
          'Control your privacy settings'
        )}
        {renderSettingItem(
          <Wallet size={24} color="#475569" />,
          'Wallet',
          'Manage your blockchain wallet'
        )}
        {renderSettingItem(
          <Globe2 size={24} color="#475569" />,
          'Language',
          'English (US)'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        {renderSettingItem(
          <HelpCircle size={24} color="#475569" />,
          'Help Center',
          'Get help and contact support'
        )}
      </View>

      <Pressable style={styles.logoutButton} onPress={handleSignOut}>
        <LogOut size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  signInPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signInText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signInButtonText: {
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    fontSize: 16,
  },
  profileSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#ffffff',
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
  },
  editButton: {
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#475569',
  },
  section: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 20,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1e293b',
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#ef4444',
    marginLeft: 8,
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
});