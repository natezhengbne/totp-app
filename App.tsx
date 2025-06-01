import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddAccountScreen from './screens/AddAccountScreen';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  AddAccount: undefined;
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }: { navigation: StackNavigationProp<RootStackParamList, 'Home'> }) => ({
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: '#fff',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('AddAccount')} style={{ marginRight: 15, padding: 6 }}>
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AddAccount"
          component={AddAccountScreen}
          options={() => ({
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
