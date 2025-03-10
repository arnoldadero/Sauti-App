import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop' }}
          style={styles.heroImage}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Welcome to Sautii</Text>
          <Text style={styles.heroSubtitle}>Your voice matters in shaping our community</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Link href="/issues/new" asChild>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Report an Issue</Text>
          </Pressable>
        </Link>
        <Link href="/forums" asChild>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Join Discussions</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Updates</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>New Park Development</Text>
          <Text style={styles.cardDescription}>Community feedback needed for the proposed Central Park renovation project.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Town Hall Meeting</Text>
          <Text style={styles.cardDescription}>Join us this Friday for an open discussion about community initiatives.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  hero: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#ffffff',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#0891b2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1e293b',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
  },
});