import { useState } from 'react';
import { Button, Platform, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callGroc = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('https://api.groc.ai/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROC_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Bonjour, qui es-tu ?',
        }),
      });

      const data = await res.json();
      setResponse(data.response || JSON.stringify(data));
    } catch (err) {
      setResponse('Erreur lors de l’appel à GROC.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bob AI Test</ThemedText>
        <Button title={loading ? 'Chargement...' : 'Parler à Bob'} onPress={callGroc} />
        {response !== '' && (
          <Text style={{ marginTop: 10, color: 'white' }}>{response}</Text>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});