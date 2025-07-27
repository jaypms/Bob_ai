import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  const [text, setText] = useState('Chargement...');

  useEffect(() => {
    const testFetch = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await res.json();
        setText(data.title || 'Réponse reçue');
      } catch (e) {
        setText('Échec du test fetch');
        console.error(e);
      }
    };

    testFetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.response}>{text}</Text>
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
  response: {
    color: 'white',
    fontSize: 16,
  },
});