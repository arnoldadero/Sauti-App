import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

// Define interfaces for props
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

interface MarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  pinColor?: string;
}

// Web implementation - a simple placeholder
const WebMapView: React.FC<MapViewProps> = ({ style }) => {
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

const WebMarker: React.FC<MarkerProps> = () => null;

// Export based on platform
let MapView: React.FC<MapViewProps>;
let Marker: React.FC<MarkerProps>;

// Web platform exports the web implementation
if (Platform.OS === 'web') {
  MapView = WebMapView;
  Marker = WebMarker;
} else {
  // For native platforms, we'll try to import and use react-native-maps
  // But to avoid the error during web build, we need to use require at runtime
  // This code will never execute on web, so it's safe
  try {
    const NativeMap = require('react-native-maps');
    MapView = NativeMap.default;
    Marker = NativeMap.Marker;
  } catch (e) {
    // Fallback in case of any issues
    console.warn('Could not load react-native-maps:', e);
    MapView = WebMapView;
    Marker = WebMarker;
  }
}

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
