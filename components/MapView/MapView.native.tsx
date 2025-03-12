import React from 'react';
import RNMapView, { Marker as RNMarker } from 'react-native-maps';

// We're simply re-exporting the components from react-native-maps for native platforms
export const Marker = RNMarker;
export default RNMapView;
