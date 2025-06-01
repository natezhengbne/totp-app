import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TokenItem({ account, token }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{account}: {token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 18,
  },
});
