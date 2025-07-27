import React, { useState } from "react";
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function BobMobile() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("http://100.68.8.46:3000/api/grocProxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!res.ok) {
        const errText = await res.text();
        setError(`Erreur API: ${errText}`);
      } else {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setError(`Erreur réseau: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pose ta question à Bob"
        value={input}
        onChangeText={setInput}
        editable={!loading}
      />
      <Button title="Envoyer" onPress={handleSend} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#121212",
  },
  input: {
    height: 50,
    borderColor: "#6200ee",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#fff",
    marginBottom: 12,
  },
  responseContainer: {
    marginTop: 20,
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 8,
  },
  responseText: {
    color: "#e0e0e0",
    fontFamily: "monospace",
  },
  errorText: {
    marginTop: 20,
    color: "#cf6679",
  },
});