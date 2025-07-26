import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ActionButtonProps = {
  title: string;
  onPress: () => void;
};

export default function ActionButton({ title, onPress }: ActionButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF0080',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF0080',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});