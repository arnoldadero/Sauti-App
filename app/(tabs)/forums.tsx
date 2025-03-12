import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { MessageCircle, ThumbsUp, Share2 } from 'lucide-react-native';

const MOCK_DISCUSSIONS = [
  {
    id: '1',
    title: 'Tax Reform Impact on Small Businesses',
    author: 'Mwende Kimani',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    content: 'How will the new tax proposals affect small business owners in our county? Let\'s share experiences and potential mitigation strategies.',
    replies: 34,
    likes: 52,
    category: 'Economy',
    timeAgo: '2h ago',
  },
  {
    id: '2',
    title: 'Citizens Rights Protection Movement',
    author: 'John Wachira',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    content: 'Let\'s organize a peaceful grassroots initiative to protect civic spaces and freedom of expression. Share your ideas for community-based solutions.',
    replies: 78,
    likes: 105,
    category: 'Civic Rights',
    timeAgo: '5h ago',
  },
  {
    id: '3',
    title: 'Drought Response in Northern Counties',
    author: 'Halima Omar',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    content: "Many communities are facing critical water shortages. What resources are available and how can we better coordinate relief efforts?",
    replies: 42,
    likes: 67,
    category: 'Climate',
    timeAgo: '1d ago',
  },
  {
    id: '4',
    title: 'Youth Unemployment Solutions',
    author: 'Brian Ochieng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    content: "Let's brainstorm practical solutions to address the growing youth unemployment crisis affecting our communities.",
    replies: 56,
    likes: 89,
    category: 'Jobs',
    timeAgo: '2d ago',
  },
  {
    id: '5',
    title: 'Anti-Corruption Watchdog Initiative',
    author: 'Faith Mwangi',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop',
    content: "Proposal to create a community-based initiative to monitor and report corruption at the local government level.",
    replies: 65,
    likes: 122,
    category: 'Governance',
    timeAgo: '3d ago',
  },
];

export default function ForumsScreen() {
  const renderItem = ({ item }: { item: typeof MOCK_DISCUSSIONS[0] }) => (
    <Pressable style={styles.discussionCard}>
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      
      <View style={styles.actions}>
        <Pressable style={styles.actionButton}>
          <MessageCircle size={20} color="#64748b" />
          <Text style={styles.actionText}>{item.replies}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThumbsUp size={20} color="#64748b" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Share2 size={20} color="#64748b" />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DISCUSSIONS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Popular Discussions</Text>
            <Pressable style={styles.newTopicButton}>
              <Text style={styles.newTopicText}>New Topic</Text>
            </Pressable>
          </View>
        )}
      />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1e293b',
  },
  newTopicButton: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newTopicText: {
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    fontSize: 14,
  },
  discussionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#1e293b',
  },
  timeAgo: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
  },
  categoryBadge: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#475569',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1e293b',
    marginVertical: 12,
  },
  content: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
});