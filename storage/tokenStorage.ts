import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TOTP_TOKENS';

export async function saveTokens(tokens: any[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export async function getTokens() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
