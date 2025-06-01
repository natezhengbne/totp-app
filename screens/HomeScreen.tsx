import React from 'react';
import { View, StyleSheet } from 'react-native';
import TOTPContainer from '../components/TOTPContainer';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TOTPContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
