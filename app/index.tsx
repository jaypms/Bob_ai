import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Bob IA 🤖</Text>
      <Text style={styles.subtitle}>
        Ton assistant intelligent pour coder, mixer, masteriser, et plus encore !
      </Text>
      {/* Ici on ajoutera les boutons et fonctionnalités */}
    </SafeAreaView>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF0080',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#eee',
    textAlign: 'center',
  },
});