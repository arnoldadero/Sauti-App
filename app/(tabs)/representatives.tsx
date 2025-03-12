import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
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
  countyId?: number;
}

// List of Kenya's 47 counties
const KENYA_COUNTIES = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta", "Garissa", 
  "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", "Embu", 
  "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", 
  "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia", "Uasin Gishu", 
  "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", 
  "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", 
  "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

// Fallback mock data in case API fails
const MOCK_REPRESENTATIVES: Representative[] = [
  {
    id: '1',
    name: 'William Samoei Ruto',
    position: 'President of Kenya',
    district: 'Republic of Kenya',
    photo: 'https://www.president.go.ke/wp-content/uploads/administration.jpg',
    email: 'president@president.go.ke',
    phone: '(+254) 20-2227436',
    location: 'State House, Nairobi',
    nextMeeting: 'April 15, 2025',
    expertise: ['Economics', 'Agriculture', 'Bottom-up Economic Model'],
    level: 'national'
  },
  {
    id: '2',
    name: 'Musalia Mudavadi',
    position: 'Prime Cabinet Secretary',
    district: 'National Government',
    photo: 'https://www.president.go.ke/wp-content/uploads/2022/09/PCS.jpg',
    email: 'cs@foreignaffairs.go.ke',
    phone: '(+254) 722-333-444',
    location: 'Harambee House, Nairobi',
    nextMeeting: 'April 3, 2025',
    expertise: ['Diplomacy', 'International Relations', 'Cabinet Affairs'],
    level: 'national'
  },
  {
    id: '3',
    name: 'Johnson Sakaja',
    position: 'Governor',
    district: 'Nairobi County',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sen._Johnson_Sakaja%2C_CBS.jpg/220px-Sen._Johnson_Sakaja%2C_CBS.jpg',
    email: 'governor@nairobi.go.ke',
    phone: '(+254) 20-2247277',
    location: 'City Hall, Nairobi',
    nextMeeting: 'March 30, 2025',
    expertise: ['Urban Planning', 'Youth Affairs', 'County Administration'],
    level: 'county',
    countyId: 47
  },
  {
    id: '4',
    name: 'Moses Wetangula',
    position: 'Speaker of the National Assembly',
    district: 'National Assembly',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Moses_Wetangula.jpg',
    email: 'speaker@parliament.go.ke',
    phone: '(+254) 20-2221291',
    location: 'Parliament Buildings, Nairobi',
    nextMeeting: 'April 5, 2025',
    expertise: ['Parliamentary Procedures', 'Constitutional Law', 'Legislative Affairs'],
    level: 'national'
  },
  {
    id: '5',
    name: 'Amason Kingi',
    position: 'Speaker of the Senate',
    district: 'Senate',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Amason_Kingi.JPG/220px-Amason_Kingi.JPG',
    email: 'speaker@senate.go.ke',
    phone: '(+254) 20-2221291',
    location: 'Parliament Buildings, Nairobi',
    nextMeeting: 'April 7, 2025',
    expertise: ['Constitutional Law', 'Devolution', 'County Affairs'],
    level: 'national'
  },
  {
    id: '6',
    name: 'Abdulswamad Shariff Nassir',
    position: 'Governor',
    district: 'Mombasa County',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Abdulswamad_Nassir%2C_Governor_of_Mombasa_County_2022.jpg',
    email: 'governor@mombasa.go.ke',
    phone: '(+254) 41-2311531',
    location: 'Mombasa County Headquarters',
    nextMeeting: 'April 12, 2025',
    expertise: ['Tourism', 'Maritime Affairs', 'Port Management'],
    level: 'county',
    countyId: 1
  },
  {
    id: '7',
    name: 'Esther Passaris',
    position: 'Women Representative',
    district: 'Nairobi County',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Esther_Passaris.jpg/220px-Esther_Passaris.jpg',
    email: 'esther.passaris@parliament.go.ke',
    phone: '(+254) 722-111-222',
    location: 'Parliament Buildings, Nairobi',
    nextMeeting: 'April 4, 2025',
    expertise: ['Women Rights', 'Gender Equality', 'Social Development'],
    level: 'national'
  },
  {
    id: '8',
    name: 'Robert Mbatia',
    position: 'Member of County Assembly (MCA)',
    district: 'Nairobi - Kariobangi South Ward',
    photo: 'https://www.nairobiassembly.go.ke/ncca/docs/members/Robert_Mbatia.jpg',
    email: 'robertmbatia@nairobiassembly.go.ke',
    phone: '(+254) 722-987-654',
    location: 'Nairobi County Assembly',
    nextMeeting: 'March 29, 2025',
    expertise: ['Urban Development', 'Budget & Appropriations', 'Public Service'],
    level: 'county',
    countyId: 47
  },
  {
    id: '9',
    name: 'Susan Kihika',
    position: 'Governor',
    district: 'Nakuru County',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Hon._Susan_Kihika.jpg/220px-Hon._Susan_Kihika.jpg',
    email: 'governor@nakuru.go.ke',
    phone: '(+254) 51-2216480',
    location: 'Nakuru County Headquarters',
    nextMeeting: 'April 19, 2025',
    expertise: ['Agriculture', 'Tourism', 'County Legislation'],
    level: 'county',
    countyId: 32
  },
  {
    id: '10',
    name: 'Gladys Wanga',
    position: 'Governor',
    district: 'Homa Bay County',
    photo: 'https://nation.africa/resource/image/4016530/landscape_ratio16x9/1160/652/ae3b2a4d0be9f5b9301f36e57cc9abe7/vM/govwanga.jpg',
    email: 'governor@homabay.go.ke',
    phone: '(+254) 59-2022522',
    location: 'Homa Bay County Headquarters',
    nextMeeting: 'April 22, 2025',
    expertise: ['Healthcare', 'Women Empowerment', 'Rural Development'],
    level: 'county',
    countyId: 43
  },
  {
    id: '11',
    name: 'Anne Waiguru',
    position: 'Governor',
    district: 'Kirinyaga County',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Anne_Mumbi_Waiguru.jpg/220px-Anne_Mumbi_Waiguru.jpg',
    email: 'governor@kirinyaga.go.ke',
    phone: '(+254) 20-2380539',
    location: 'Kirinyaga County Headquarters',
    nextMeeting: 'April 14, 2025',
    expertise: ['Public Administration', 'Women Leadership', 'Devolution'],
    level: 'county',
    countyId: 20
  }
];

const path: string = "/representatives";

export default function RepresentativesScreen() {
  // Initialize with MOCK_REPRESENTATIVES to prevent continuous loading
  const [representatives, setRepresentatives] = useState<Representative[]>(MOCK_REPRESENTATIVES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nationalActiveSections, setNationalActiveSections] = useState<number[]>([0]);
  const [countyActiveSections, setCountyActiveSections] = useState<number[]>([]);
  const router = useRouter();

  // Only fetch from API if necessary in the future
  useEffect(() => {
    // Already initialized with mock data
    // Only uncomment this when real API is ready
    // fetchRepresentatives();
  }, []);

  const fetchRepresentatives = async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch from API...');
      
      // For now just use mock data
      // Uncomment below when API is ready
      /*
      const response = await fetch('http://api.iebc.or.ke/elections/results/winners');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRepresentatives(data);
      */
      
      setLoading(false);
    } catch (error) {
      console.warn('API fetch failed, using mock data');
      setError('Failed to load data from API');
      setLoading(false);
    }
  };

  // Function to group county representatives by county
  const getCountyRepresentatives = () => {
    const countyReps = representatives.filter(rep => rep.level === 'county');
    
    // Structure to organize by counties
    const countySections = KENYA_COUNTIES.map((county, index) => {
      const countyId = index + 1;
      const countyLeaders = countyReps.filter(rep => rep.countyId === countyId);
      
      // Sort leaders within county (Governor first, then others)
      countyLeaders.sort((a, b) => {
        if (a.position.includes('Governor')) return -1;
        if (b.position.includes('Governor')) return 1;
        return 0;
      });
      
      return {
        title: `${county} County`,
        data: countyLeaders,
        countyId: countyId
      };
    });
    
    // Filter out counties with no representatives
    return countySections.filter(county => county.data.length > 0);
  };

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

  // Only compute these after loading is complete
  const nationalReps = representatives.filter(rep => rep.level === 'national');
  const nationalSection = [{ title: 'National Government', data: nationalReps }];
  const countySections = getCountyRepresentatives();

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>National Government</Text>
        <Accordion
          sections={nationalSection}
          activeSections={nationalActiveSections}
          renderHeader={renderSectionHeader}
          renderContent={renderSectionContent}
          onChange={setNationalActiveSections}
          sectionContainerStyle={styles.accordionSection}
        />
      </View>
      
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>County Governments</Text>
        {countySections.length > 0 ? (
          countySections.map((section, index) => (
            <View key={section.countyId} style={styles.countyAccordion}>
              <Accordion
                sections={[section]}
                activeSections={countyActiveSections.includes(index) ? [0] : []}
                renderHeader={renderSectionHeader}
                renderContent={renderSectionContent}
                onChange={(newSections) => {
                  const newActiveSections = [...countyActiveSections];
                  if (newSections.length > 0) {
                    // Add this section to active sections if not already included
                    if (!newActiveSections.includes(index)) {
                      newActiveSections.push(index);
                    }
                  } else {
                    // Remove this section from active sections
                    const idx = newActiveSections.indexOf(index);
                    if (idx !== -1) {
                      newActiveSections.splice(idx, 1);
                    }
                  }
                  setCountyActiveSections(newActiveSections);
                }}
                sectionContainerStyle={styles.accordionSection}
              />
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No county representatives available</Text>
        )}
      </View>
    </ScrollView>
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
  },
  categoryContainer: {
    marginBottom: 24
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  accordionSection: {
    marginBottom: 16
  },
  countyAccordion: {
    marginBottom: 16
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16
  }
});
