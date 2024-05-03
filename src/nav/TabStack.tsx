import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { 
	HomeScreen, 
	ProfileScreen, 
	// LoggingScreen 
} from "../views";
import { NavigationContainer } from "@react-navigation/native";
import NavStack from "./NavStack";

const Tab = createBottomTabNavigator();

export default function TabStack() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Profile" component={ProfileScreen} />
				<Tab.Screen
					name="Session"
					component={NavStack}
					options={{ headerShown: false }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
