/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Link, useGlobalSearchParams } from "expo-router";
import useClimbsBySession from "@/src/hooks/db/useClimbsBySession";

export default function ActiveSessionPage() {
	// Session ID to be passed to NewSession after creating on /manage
	const { sessionId } = useGlobalSearchParams<{ sessionId: string }>();
	const climbsBySesh = useClimbsBySession(parseInt(sessionId));

	console.log(`session data: ${JSON.stringify(climbsBySesh?.data)}`);

	if (!climbsBySesh?.data || !climbsBySesh?.data.length) {
		return (
			<View>
				<Text>Error</Text>
				<Text>
					There has been an error retrieving the climbs from the
					database.
				</Text>
			</View>
		);
	} else {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Link href="/logging" asChild>
					<Button title={"Log a Climb"} color={"blue"} />
				</Link>
				<View style={styles.climbListContainer}>
					{climbsBySesh?.data?.map((climb, index) => (
						// <Link href=`/climb/${climbId}`/>
						<View style={styles.climbItemContainer} key={index}>
							<Text style={styles.climbItemHeader}>
								{climb.color} {climb.grade}
							</Text>
							<Text>Terrain type: {climb.terrain}</Text>
							<Text>Problem holds: {climb.problemHolds}</Text>
							{/* <Text>Terrain type: {climb.terrain?.join(',')}</Text> */}
							{/* <Text>Problem holds: {climb.problemHolds.join(',')}</Text> */}
							<Text>Progress: {climb.progress}</Text>
						</View>
						// </Link>
					))}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		margin: 20,
		marginBottom: 50,
	},
	climbListContainer: {
		marginTop: 10,
		width: "100%",
	},
	climbItemContainer: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 3,
		margin: 10,
	},
	climbItemHeader: {
		fontWeight: "bold",
	},
	textinput: {
		backgroundColor: "white",
		borderColor: "black",
		borderStyle: "solid",
		borderWidth: 1,
		fontSize: 20,
		width: "30%",
	},
});
