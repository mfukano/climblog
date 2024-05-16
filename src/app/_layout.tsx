import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { 
	Suspense, 
	useEffect 
} from "react";
import useDatabase from "@s/hooks/db/useDB";
import { database } from "../db/sqlite";
import { SQLiteProvider } from "expo-sqlite";
import { Stack } from "expo-router";
import Fallback from "../components/basic-components/Fallback";
import { View } from "react-native";

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

	return (
		<View>
			<Suspense fallback={<Fallback />}>
				<SQLiteProvider 
					databaseName="climblog.db"
					onInit={database.setupTablesAsync} 
					useSuspense>

					{/** providers that can be accessed by any routes  */}
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
				</SQLiteProvider>
			</Suspense>
		</View>
	);
}