import { useState } from 'react';
import { Text, TextInput, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useBobAgent } from '../hooks/useBobAgent';

export default function BobChat() {
  const [prompt, setPrompt] = useState('');
  const { loading, error, response, sendPrompt } = useBobAgent();

  const handleSend = () => {
    if (prompt.trim()) {
      sendPrompt(prompt);
      setPrompt('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1 }}>
        {loading && <ActivityIndicator size="large" color="#000" />}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        {response && <Text style={{ marginTop: 16 }}>{response}</Text>}
      </ScrollView>
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TextInput
          style={{
            flex: 1,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            marginRight: 8,
          }}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Pose une question à Bob..."
        />
        <Button title="Envoyer" onPress={handleSend} disabled={loading} />
      </View>
    </View>
  );
}