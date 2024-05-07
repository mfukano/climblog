import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import useDatabase from "../hooks/db/useDB";
import { Stack } from "expo-router";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const isDBLoadingComplete = useDatabase();
	const [loaded, error] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			console.log(`isDBLoadingComplete: ${isDBLoadingComplete}`);
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!isDBLoadingComplete) {
		return null;
	}
	return <RootLayoutNav />;
}

/**
 *	This should be the home of any providers that need to be globally
 * accessible, and also where any new top-level screens are added. 
 */
function RootLayoutNav() {
	return (
		<>
			{/** providers that can be accessed by any routes  */}
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</>
	);
}