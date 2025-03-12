import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useState } from 'react';
import MapView, { Marker } from '../../components/MapView';

const MOCK_ISSUES = [
  {
    id: '1',
    title: 'Road Maintenance Required',
    description: 'Multiple potholes on Main Street need urgent repair',
    status: 'pending',
    date: '2024-02-20',
    location: {
      latitude: -1.286389,
      longitude: 36.817223,
      description: 'Main Street'
    }
  },
  {
    id: '2',
    title: 'Street Light Malfunction',
    description: 'Three street lights are not working on Oak Avenue',
    status: 'in_progress',
    date: '2024-02-19',
    location: {
      latitude: -1.286389,
      longitude: 36.817223,
      description: 'Oak Avenue'
    }
  },
  {
    id: '3',
    title: 'Park Cleanup',
    description: 'Central Park requires maintenance and garbage removal',
    status: 'resolved',
    date: '2024-02-18',
    location: {
      latitude: -1.286389,
      longitude: 36.817223,
      description: 'Central Park'
    }
  },
];

export default function IssuesScreen() {
  const [activeTab, setActiveTab] = useState('list');

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color="#f59e0b" />;
      case 'in_progress':
        return <AlertCircle size={20} color="#3b82f6" />;
      case 'resolved':
        return <CheckCircle size={20} color="#10b981" />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }: { item: typeof MOCK_ISSUES[0] }) => (
    <Pressable style={styles.issueCard}>
      <View style={styles.issueHeader}>
        <Text style={styles.issueTitle}>{item.title}</Text>
        {renderStatusIcon(item.status)}
      </View>
      <Text style={styles.issueDescription}>{item.description}</Text>
      <Text style={styles.issueDate}>{item.date}</Text>
      {item.location && (
        <Text style={styles.issueLocation}>{item.location.description}</Text>
      )}
    </Pressable>
  );

  const renderListView = () => (
    <FlatList
      data={MOCK_ISSUES}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );

  const renderMapView = () => (
    <View style={styles.mapContainer}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: -1.286389,
          longitude: 36.817223,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {MOCK_ISSUES.map(issue => (
          <Marker
            key={issue.id}
            coordinate={{
              latitude: issue.location.latitude,
              longitude: issue.location.longitude
            }}
            title={issue.title}
            description={issue.description}
            pinColor={
              issue.status === 'pending' ? '#f59e0b' : 
              issue.status === 'in_progress' ? '#3b82f6' : '#10b981'
            }
          />
        ))}
      </MapView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable 
          style={[styles.tab, activeTab === 'list' && styles.activeTab]} 
          onPress={() => setActiveTab('list')}
        >
          <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>List</Text>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'map' && styles.activeTab]} 
          onPress={() => setActiveTab('map')}
        >
          <Text style={[styles.tabText, activeTab === 'map' && styles.activeTabText]}>Map</Text>
        </Pressable>
      </View>
      
      {activeTab === 'list' ? renderListView() : renderMapView()}
      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>Report New Issue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContainer: {
    padding: 16,
  },
  issueCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  issueTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  issueDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  issueDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94a3b8',
  },
  addButton: {
    backgroundColor: '#0891b2',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#0891b2',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#475569',
  },
  activeTabText: {
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  issueLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  webMapPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    margin: 16,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webMapTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0891b2',
    marginBottom: 12,
    textAlign: 'center',
  },
  webMapText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 22,
  },
});