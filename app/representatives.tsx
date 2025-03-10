import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RepresentativesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/(tabs)/representatives");
  }, []);

  return null;
}
