import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import * as cheerio from 'cheerio';
import Accordion from 'react-native-collapsible/Accordion';

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
  level: 'national' | 'county';
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
    expertise: ['Constitutional Law', 'Women\'s Rights'],
    level: 'national'
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
    expertise: ['Agriculture', 'Trade and Commerce'],
    level: 'national'
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
    expertise: ['Tourism', 'Infrastructure Development'],
    level: 'county'
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
    expertise: ['Youth Affairs', 'Sports and Culture'],
    level: 'county'
  }
];

const path: string = "/representatives";

export default function RepresentativesScreen() {
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSections, setActiveSections] = useState<number[]>([0, 1]);
  const router = useRouter();

  const nationalReps = representatives.filter(rep => rep.level === 'national');
  const countyReps = representatives.filter(rep => rep.level === 'county');

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

  const renderRepresentative = (item: Representative) => (
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

  const renderSectionContent = (section: { title: string, data: Representative[] }) => (
    <View style={styles.sectionContent}>
      {section.data.map(item => renderRepresentative(item))}
    </View>
  );

  const renderSectionHeader = (section: { title: string, data: Representative[] }, index: number, isActive: boolean) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
      <Ionicons name={isActive ? "chevron-up" : "chevron-down"} size={24} color="#0066cc" />
    </View>
  );

  const sections = [
    { title: 'National Government', data: nationalReps },
    { title: 'County Governments', data: countyReps }
  ];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text>Loading representatives...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle" size={40} color="red" />
        <Text style={styles.errorText}>{error}</Text>
        <Text>Using locally stored data instead</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Accordion
        sections={sections}
        activeSections={activeSections}
        renderHeader={renderSectionHeader}
        renderContent={renderSectionContent}
        onChange={setActiveSections}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
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
  sectionHeader: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContent: {
    marginBottom: 16,
  },
  centered: {
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
