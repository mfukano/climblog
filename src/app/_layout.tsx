import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { 
	Suspense, 
	useEffect
} from "react";
import useDatabase from "@s/hooks/db/useDB";
import { SQLiteProvider } from "expo-sqlite";
import { Stack } from "expo-router";
import Fallback from "../components/basic-components/Fallback";
import { View } from "react-native";
import { 
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

import { useColorScheme } from "@s/hooks/useColorScheme";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

/**
 *	Layout is the file I've decided that Expo wants as its "provider core". 
 * 	This file establishes a lot of things:
 * - The database on launch, if it doesn't already exist (`useDatabase()`)
 * - Font and style through `ThemeProvider` and `useFonts`
 * - The DOM tree, abstracted through `RootLayoutNav`
 * @returns <RootLayoutNav>, a TSX provider setter for the application.
 */
export default function RootLayout() {
	const {createDB, isDBLoading} = useDatabase();
	const [loaded, error] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		console.log("loaded: ", loaded);
		console.log("isDBLoading: ", isDBLoading);
		if (loaded && !isDBLoading) {
			console.log("Hiding splash screen");
			SplashScreen.hideAsync();
		}
	}, [loaded, isDBLoading]);

	useEffect(() => {
		(async () => {
			await createDB();
		})();
	}, []);
	
	if (!loaded) {
		console.log("Not loaded, returning null");
		return (<View><Fallback /></View>);
	}

	console.log("Rendering layout");
	return <RootLayoutNav />;
}

/**
 * This is the "entry point" or the location where
 * - The initial view Stack is established
 * - All providers are setup; database, queryclient, theme
 * - Suspense is added to the shadow DOM and provides fallbacks for loaders
 * 
 * @returns RootLayout DOM tree 
 */
function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme }>
			<GestureHandlerRootView>

				<Suspense fallback={<Fallback />}>
					<QueryClientProvider client={queryClient}>
						<SQLiteProvider 
							databaseName="climblog.db"
							assetSource={{ assetId: require("@/assets/db/climblog.db"), forceOverwrite: false }}
							useSuspense>

							{/** providers that can be accessed by any routes  */}
							<Stack>
								{/* <Fallback /> */}
								<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
							</Stack>
						</SQLiteProvider>
					</QueryClientProvider>
				</Suspense>
			</GestureHandlerRootView>
		</ThemeProvider>
	);
}