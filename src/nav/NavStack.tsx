import React from "react";
// import { SafeAreaView, View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActiveSession, LoggingScreen, SessionScreen } from "../views";

const Stack = createStackNavigator();

export default function NavStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Sessions" component={SessionScreen} />
			<Stack.Screen name="Log Climb" component={LoggingScreen} />
			<Stack.Screen name="Active Session" component={ActiveSession} /> 
		</Stack.Navigator>

	);
}