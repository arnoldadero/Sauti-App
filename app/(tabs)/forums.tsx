import { View, Text, StyleSheet, FlatList, Pressable, Image, ScrollView, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { MessageCircle, ThumbsUp, Share2, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

// Mock data for National Forums
const NATIONAL_FORUMS = [
  {
    id: '1',
    title: 'Tax Reform Impact on Small Businesses',
    author: 'Mwende Kimani',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    content: 'How will the new tax proposals affect small business owners in our country? Let\'s share experiences and potential mitigation strategies.',
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
    title: 'Anti-Corruption Watchdog Initiative',
    author: 'Faith Mwangi',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop',
    content: "Proposal to create a community-based initiative to monitor and report corruption at the national government level.",
    replies: 65,
    likes: 122,
    category: 'Governance',
    timeAgo: '3d ago',
  },
];

// Mock data for County (Devolved) Forums
const COUNTY_FORUMS = [
  {
    id: '1',
    title: 'Drought Response in Northern Counties',
    author: 'Halima Omar',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    content: "Many communities are facing critical water shortages. What resources are available and how can we better coordinate relief efforts?",
    replies: 42,
    likes: 67,
    category: 'Climate',
    county: 'Marsabit',
    timeAgo: '1d ago',
  },
  {
    id: '2',
    title: 'Youth Unemployment Solutions',
    author: 'Brian Ochieng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    content: "Let's brainstorm practical solutions to address the growing youth unemployment crisis affecting our communities.",
    replies: 56,
    likes: 89,
    category: 'Jobs',
    county: 'Kisumu',
    timeAgo: '2d ago',
  },
  {
    id: '3',
    title: 'Local Infrastructure Development',
    author: 'Nancy Kamau',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
    content: "Discussion on the county's infrastructure projects and community involvement in development planning.",
    replies: 28,
    likes: 45,
    category: 'Development',
    county: 'Nairobi',
    timeAgo: '4d ago',
  },
];

// Define forum item interface
interface ForumItem {
  id: string;
  title: string;
  author: string;
  avatar: string;
  content: string;
  replies: number;
  likes: number;
  category: string;
  timeAgo: string;
  county?: string;
}

// Kenyan Button Component Props
interface KenyanButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

// Kenyan Button Component
const KenyanButton = ({ onPress, title, style, textStyle }: KenyanButtonProps) => (
  <Pressable 
    onPress={onPress} 
    style={({pressed}) => [
      styles.kenyanButton,
      {opacity: pressed ? 0.8 : 1},
      style
    ]}
  >
    <Text style={[styles.kenyanButtonText, textStyle]}>{title}</Text>
  </Pressable>
);

// Accordion Section Props
interface AccordionSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

// Accordion Component
const AccordionSection = ({ title, expanded, onToggle, children }: AccordionSectionProps) => {
  return (
    <View style={styles.accordionContainer}>
      <Pressable style={styles.accordionHeader} onPress={onToggle}>
        <Text style={styles.accordionTitle}>{title}</Text>
        {expanded ? 
          <ChevronUp size={24} color="#000" /> : 
          <ChevronDown size={24} color="#000" />
        }
      </Pressable>
      {expanded && (
        <View style={styles.accordionContent}>
          {children}
        </View>
      )}
    </View>
  );
};

// Discussion Item Props
interface DiscussionItemProps {
  item: ForumItem;
}

// Discussion Item Component
const DiscussionItem = ({ item }: DiscussionItemProps) => (
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
    
    {item.county && (
      <View style={styles.countyTag}>
        <Text style={styles.countyText}>County: {item.county}</Text>
      </View>
    )}
    
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

export default function ForumsScreen() {
  const [nationalExpanded, setNationalExpanded] = useState(true);
  const [countyExpanded, setCountyExpanded] = useState(false);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
  });

  // Don't render until fonts are loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Public Forums' }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.pageHeader}>
          <Text style={styles.headerTitle}>Public Forums</Text>
          <KenyanButton 
            title="Start New Topic" 
            onPress={() => {}} 
            textStyle={{}}
          />
        </View>
        
        <AccordionSection 
          title="National Forums" 
          expanded={nationalExpanded}
          onToggle={() => setNationalExpanded(!nationalExpanded)}
        >
          {NATIONAL_FORUMS.map(item => (
            <DiscussionItem key={item.id} item={item} />
          ))}
          <KenyanButton 
            title="View All National Forums" 
            onPress={() => {}} 
            style={styles.viewAllButton}
            textStyle={{}}
          />
        </AccordionSection>
        
        <AccordionSection 
          title="County Forums" 
          expanded={countyExpanded}
          onToggle={() => setCountyExpanded(!countyExpanded)}
        >
          {COUNTY_FORUMS.map(item => (
            <DiscussionItem key={item.id} item={item} />
          ))}
          <KenyanButton 
            title="View All County Forums" 
            onPress={() => {}} 
            style={styles.viewAllButton}
            textStyle={{}}
          />
        </AccordionSection>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    padding: 16,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1e293b',
  },
  accordionContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f1f5f9',
  },
  accordionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1e293b',
  },
  accordionContent: {
    padding: 16,
  },
  discussionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    marginBottom: 8,
  },
  content: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
  },
  countyTag: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  countyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#2563eb',
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
    marginLeft: 4,
  },
  kenyanButton: {
    backgroundColor: '#000', // Black base color (Kenyan flag)
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: 'relative',
    borderWidth: 4,
    borderColor: '#000', // Black border
    // The additional styling for the Kenyan flag stripes is created with the border colors
    borderTopColor: '#000', // Black
    borderRightColor: '#ce1126', // Red
    borderBottomColor: '#006600', // Green
    borderLeftColor: '#000', // Black
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  kenyanButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  viewAllButton: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 24,
  },
});