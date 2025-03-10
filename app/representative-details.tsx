import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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

const MOCK_REPRESENTATIVES: Representative[] = [
  {
    id: '1',
    name: 'John Doe',
    position: 'MP',
    district: 'Nairobi East',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: 'john.doe@gov.ke',
    phone: '(+254) 712-345-678',
    location: 'Parliament Buildings',
    nextMeeting: 'March 15, 2025',
    expertise: ['Education', 'Healthcare']
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'MCA',
    district: 'Westlands',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    email: 'jane.smith@gov.ke',
    phone: '(+254) 723-456-789',
    location: 'County Assembly',
    nextMeeting: 'March 12, 2025',
    expertise: ['Infrastructure', 'Youth Affairs']
  },
  {
    id: '3',
    name: 'David Kamau',
    position: 'Governor',
    district: 'Nairobi County',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    email: 'david.kamau@gov.ke',
    phone: '(+254) 734-567-890',
    location: 'County Headquarters',
    nextMeeting: 'March 20, 2025',
    expertise: ['Finance', 'Urban Planning']
  }
];

export default function RepresentativeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [representative, setRepresentative] = useState<Representative | null>(null);

  useEffect(() => {
    const foundRep = MOCK_REPRESENTATIVES.find(rep => rep.id === id);
    setRepresentative(foundRep || null);
  }, [id]);

  const handleCall = () => {
    if (representative?.phone) {
      Linking.openURL(`tel:${representative.phone}`);
    }
  };

  const handleEmail = () => {
    if (representative?.email) {
      Linking.openURL(`mailto:${representative.email}`);
    }
  };

  if (!representative) {
    return (
      <View style={styles.container}>
        <Text>Representative not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: representative.name }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: representative.photo }} style={styles.photo} />
          <Text style={styles.name}>{representative.name}</Text>
          <Text style={styles.position}>{representative.position} - {representative.district}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
            <Ionicons name="call-outline" size={24} color="#0066cc" />
            <Text style={styles.contactText}>{representative.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
            <Ionicons name="mail-outline" size={24} color="#0066cc" />
            <Text style={styles.contactText}>{representative.email}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Office Location</Text>
          <Text style={styles.locationText}>{representative.location}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Public Meeting</Text>
          <View style={styles.meetingBox}>
            <Ionicons name="calendar-outline" size={24} color="#0066cc" />
            <Text style={styles.meetingText}>{representative.nextMeeting}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Areas of Expertise</Text>
          <View style={styles.expertiseContainer}>
            {representative.expertise.map((skill, index) => (
              <View key={index} style={styles.expertiseTag}>
                <Text style={styles.expertiseText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  position: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#0066cc',
  },
  locationText: {
    fontSize: 16,
    color: '#444',
  },
  meetingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    padding: 12,
    borderRadius: 8,
  },
  meetingText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#0066cc',
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  expertiseTag: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  expertiseText: {
    color: '#0277bd',
    fontSize: 14,
  },
});
