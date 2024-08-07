import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function NavStack() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
			}}
		>
			<Stack.Screen
				name="manage"
				options={{
					title: "Manage Sessions",
				}}
			/>
			<Stack.Screen
				name="logging"
				options={{
					headerLeft: () => (
						<Pressable onPress={() => router.back()}>
							<Feather
								name="arrow-left"
								size={28}
								color={"#333"}
							/>
						</Pressable>
					),
				}}
			/>
			<Stack.Screen
				name="modal"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
