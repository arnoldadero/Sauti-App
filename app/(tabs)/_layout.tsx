import { Tabs } from 'expo-router/tabs';
import { Chrome as Home, Users, FileText, MessageSquare, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
        },
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#64748b',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }: { size: number; color: string }) => <Home size={size} color={color} />,
          headerTitle: 'Sautii',
        }}
      />
      <Tabs.Screen
        name="issues"
        options={{
          title: 'Issues',
          tabBarIcon: ({ size, color }: { size: number; color: string }) => <FileText size={size} color={color} />,
          headerTitle: 'Community Issues',
        }}
      />
      <Tabs.Screen
        name="forums"
        options={{
          title: 'Forums',
          tabBarIcon: ({ size, color }: { size: number; color: string }) => <MessageSquare size={size} color={color} />,
          headerTitle: 'Public Forums',
        }}
      />
      <Tabs.Screen
        name="representatives"
        options={{
          title: 'Reps',
          tabBarIcon: ({ size, color }: { size: number; color: string }) => <Users size={size} color={color} />,
          headerTitle: 'Representatives',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }: { size: number; color: string }) => <Settings size={size} color={color} />,
          headerTitle: 'Settings',
        }}
      />
    </Tabs>
  );
}