import {
	Feather,
	FontAwesome6,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (	
						<Feather name="home" size={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesome6 name="person" size={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="(session)"
				options={{
					title: "Manage Sessions",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="playlist-plus"
							size={28}
							color={color ? color : "black"}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
