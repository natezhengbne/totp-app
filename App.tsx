import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import { Text, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Authenticator">
				<Stack.Screen
					name="Authenticator"
					component={HomeScreen}
					options={{
						headerTitleAlign: "left",
						headerStyle: { backgroundColor: "#007AFF" },
						headerTintColor: "#fff",
						headerRight: () => (
							<TouchableOpacity
								style={{ marginRight: 15 }}
								onPress={() => {
									console.log("Right button pressed");
								}}
							>
								<Text style={{ color: "#fff", fontSize: 16 }}>+</Text>
							</TouchableOpacity>
						),
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
