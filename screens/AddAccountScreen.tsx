import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

import type { StackNavigationProp } from '@react-navigation/stack';

type AddAccountScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function AddAccountScreen({ navigation }: AddAccountScreenProps) {
  const [accountName, setAccountName] = useState('');
  const [yourKey, setYourKey] = useState('');
  const [keyType, setKeyType] = useState<'Time based' | 'Counter based'>('Time based');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleAdd = () => {
    console.log('Add account:', { accountName, yourKey, keyType });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Account name</Text>
      <TextInput
        style={[styles.input, focusedInput === 'account' && styles.inputFocused]}
        value={accountName}
        onChangeText={setAccountName}
        placeholder="Enter account name"
        placeholderTextColor="#aaa"
        onFocus={() => setFocusedInput('account')}
        onBlur={() => setFocusedInput(null)}
      />

      <Text style={styles.label}>Your key</Text>
      <TextInput
        style={[styles.input, focusedInput === 'key' && styles.inputFocused]}
        value={yourKey}
        onChangeText={setYourKey}
        placeholder="Enter key"
        placeholderTextColor="#aaa"
        secureTextEntry
        autoComplete="off"
        textContentType="none"
        onFocus={() => setFocusedInput('key')}
        onBlur={() => setFocusedInput(null)}
      />

      <Text style={styles.label}>Type of key</Text>
      <View style={styles.switchContainer}>
        {['Time based', 'Counter based'].map((type) => (
          <Pressable
            key={type}
            style={[styles.optionBox, keyType === type && styles.optionBoxSelected]}
            onPress={() => setKeyType(type as 'Time based' | 'Counter based')}
          >
            <Text style={[styles.optionText, keyType === type && styles.optionTextSelected]}>{type}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#444',
  },
  inputFocused: {
    borderColor: '#8ab4f8',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  optionBox: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  optionBoxSelected: {
    backgroundColor: 'teal',
  },
  optionText: {
    color: '#ccc',
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#8ab4f8',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
