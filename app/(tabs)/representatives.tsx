import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Define type for IEBC election winners
interface ElectionWinner {
  id: string;
  name: string;
  position: string;
  county?: string;
  constituency?: string;
  party?: string;
  votes?: number;
}

// Transform to match current UI structure
interface Representative {
  id: string;
  name: string;
  position: string;
  district: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  nextMeeting: string;
  expertise: string[];
}

// Fallback mock data in case API fails
const MOCK_REPRESENTATIVES: Representative[] = [
  {
    id: '1',
    name: 'Alice Wambui',
    position: 'Member of Parliament',
    district: 'Nairobi West',
    photo: 'https://i.pravatar.cc/150?img=4',
    email: 'alice.wambui@parliament.go.ke',
    phone: '(+254) 711-222-333',
    location: 'Parliament Buildings, Nairobi',
    nextMeeting: 'April 5, 2025',
    expertise: ['Constitutional Law', 'Women\'s Rights']
  },
  {
    id: '2',
    name: 'James Otieno',
    position: 'Senator',
    district: 'Siaya County',
    photo: 'https://i.pravatar.cc/150?img=5',
    email: 'james.otieno@senate.go.ke',
    phone: '(+254) 722-333-444',
    location: 'The Senate, Nairobi',
    nextMeeting: 'April 12, 2025',
    expertise: ['Agriculture', 'Trade and Commerce']
  },
  {
    id: '3',
    name: 'Fatuma Hassan',
    position: 'Governor',
    district: 'Mombasa County',
    photo: 'https://i.pravatar.cc/150?img=6',
    email: 'fatuma.hassan@mombasa.go.ke',
    phone: '(+254) 733-444-555',
    location: 'Mombasa County Headquarters',
    nextMeeting: 'April 19, 2025',
    expertise: ['Tourism', 'Infrastructure Development']
  },
  {
    id: '4',
    name: 'Samuel Kiprono',
    position: 'Member of County Assembly (MCA)',
    district: 'Nakuru Town East Ward',
    photo: 'https://i.pravatar.cc/150?img=7',
    email: 'samuel.kiprono@nakuruassembly.go.ke',
    phone: '(+254) 744-555-666',
    location: 'Nakuru County Assembly',
    nextMeeting: 'April 26, 2025',
    expertise: ['Youth Affairs', 'Sports and Culture']
  }
];

const path: string = "/representatives";

export default function RepresentativesScreen() {
  const [representatives, setRepresentatives] = React.useState<Representative[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchRepresentatives();
  }, []);

  const fetchRepresentatives = async () => {
    try {
      console.log('Attempting to fetch from API...');
      const response = await fetch('http://api.iebc.or.ke/elections/results/winners');
      if (!response.ok) {
        console.warn(`API returned error status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API response:', data);
      setRepresentatives(data);
    } catch (error) {
      console.warn('API fetch failed, falling back to mock data:', error);
      console.log('Mock data:', MOCK_REPRESENTATIVES);
      setRepresentatives(MOCK_REPRESENTATIVES);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const handleRepresentativePress = (representative: Representative) => {
    router.push({
      pathname: '/(tabs)/representative-details',
      params: { id: representative.id }
    });
  };

  // Helper function to validate image URLs
  const getValidImageSource = (url: string | null) => {
    if (!url || url === '') {
      return require('../../assets/images/default-avatar.png');
    }
    return { uri: url };
  };

  const renderItem = ({ item }: { item: Representative }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleRepresentativePress(item)}
    >
      <Image
        source={getValidImageSource(item.photo)}
        style={styles.avatar}
        onError={() => console.log(`Failed to load image: ${item.photo}`)}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.position}>{item.position} - {item.district}</Text>
        <View style={styles.expertiseContainer}>
          {item.expertise.map((skill, index) => (
            <View key={index} style={styles.expertiseTag}>
              <Text style={styles.expertiseText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#0066cc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Your Representatives</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading representatives...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={40} color="red" />
          <Text style={styles.errorText}>{error}</Text>
          <Text>Using locally stored data instead</Text>
        </View>
      ) : (
        <FlatList
          data={representatives}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  list: {
    paddingBottom: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  position: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  expertiseTag: {
    backgroundColor: '#e1f0ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4
  },
  expertiseText: {
    color: '#0066cc',
    fontSize: 12
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 12,
    color: '#666'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 16,
    fontWeight: '500'
  }
});
