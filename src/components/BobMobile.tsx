import React, { useState } from "react";
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from "react-native";

const BobMobile = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callGrocProxyApi = async () => {
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const res = await fetch("/api/grocProxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
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
      />
      <Button title="Envoyer" onPress={callGrocProxyApi} disabled={loading || !input.trim()} />
      {loading && <ActivityIndicator size="large" color="#ff4081" />}
      {!!response && <Text style={styles.response}>{response}</Text>}
      {!!error && <Text style={styles.error}>Erreur: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: {
    borderColor: "#ff4081",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  response: {
    marginTop: 20,
    fontFamily: "monospace",
    fontSize: 14,
    color: "#333",
  },
  error: {
    marginTop: 20,
    color: "red",
    fontWeight: "bold",
  },
});

export default BobMobile;