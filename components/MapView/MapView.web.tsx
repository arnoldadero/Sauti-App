import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MapViewProps {
  style?: any;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  children?: React.ReactNode;
}

const MapView: React.FC<MapViewProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Map View Unavailable on Web</Text>
      <Text style={styles.description}>
        The map feature is only available in the mobile app. 
        Please use our mobile app for the full mapping experience.
      </Text>
    </View>
  );
};

const Marker = () => null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0891b2',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 22,
  }
});

export { Marker };
export default MapView;
