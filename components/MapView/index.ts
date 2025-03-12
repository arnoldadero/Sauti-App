// This file exists to allow the platform-specific files to be automatically selected by the bundler
import { Platform } from 'react-native';

// Import both implementations
import WebMapView, { Marker as WebMarker } from './MapView.web';
import NativeMapView, { Marker as NativeMarker } from './MapView.native';

// Export the correct implementation based on platform
export default Platform.OS === 'web' ? WebMapView : NativeMapView;
export const Marker = Platform.OS === 'web' ? WebMarker : NativeMarker;
