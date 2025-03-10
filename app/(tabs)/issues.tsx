import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

const MOCK_ISSUES = [
  {
    id: '1',
    title: 'Road Maintenance Required',
    description: 'Multiple potholes on Main Street need urgent repair',
    status: 'pending',
    date: '2024-02-20',
  },
  {
    id: '2',
    title: 'Street Light Malfunction',
    description: 'Three street lights are not working on Oak Avenue',
    status: 'in_progress',
    date: '2024-02-19',
  },
  {
    id: '3',
    title: 'Park Cleanup',
    description: 'Central Park requires maintenance and garbage removal',
    status: 'resolved',
    date: '2024-02-18',
  },
];

export default function IssuesScreen() {
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
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_ISSUES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
});