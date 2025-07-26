import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import { useBobAgent } from '../hooks/useBobAgent';

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const { loading, response, error, sendPrompt } = useBobAgent();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>👨‍💻 Bienvenue, je suis Bob IA</Text>

      <TextInput
        placeholder="Pose ta question ici..."
        value={prompt}
        onChangeText={setPrompt}
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          backgroundColor: '#fff',
        }}
        multiline
      />

      <Button
        title={loading ? 'Chargement...' : 'Envoyer'}
        onPress={() => sendPrompt(prompt)}
        disabled={loading || !prompt.trim()}
      />

      {response && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>🧠 Réponse de Bob :</Text>
          <Text style={{ fontSize: 15 }}>{response}</Text>
        </View>
      )}

      {error && (
        <Text style={{ color: 'red', marginTop: 20 }}>
          ⚠️ Erreur : {error}
        </Text>
      )}
    </ScrollView>
  );
}