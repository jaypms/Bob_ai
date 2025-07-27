import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
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
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Bob AI 👋</Text>
      <Button title={loading ? 'Chargement...' : 'Parler à Bob'} onPress={callGroc} />
      {response !== '' && <Text style={styles.response}>{response}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
  response: {
    marginTop: 20,
    color: '#ccc',
    textAlign: 'center',
  },
});