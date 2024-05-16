import React, { useEffect, useState } from "react";
import { Button, StyleSheet, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { database } from "@s/db/sqlite";

// TODO: I need to set up StackProps before I can run this through the linter
// eslint-disable-next-line react/prop-types
export default function ManageSessions() {
	const [sessionList, setSessionList] = useState([]);
	// const climbs = useSyncExternalStore(climbsStore.subscribe, climbsStore.getSnapshot);

	/**
	 * createNewSession occurs after the modal for gym name selection occurs.
	 * This function should probably live on that modal.
	 * @gym String param accepted from the modal after input.
	 */
	async function createNewSession(
		// gym: string
	) {
		const insertedSessionId: number = await database.insertSession({
			gym: "Dogpatch Boulders",
			duration: "",
			sessionDate: new Date()
		});
		router.navigate({ pathname: `/${insertedSessionId}/active` });
	}

	useEffect(() => {
		async function populateSessionsList() {
			const sessions = await database.getSessions();

			setSessionList(sessions);
		}
		populateSessionsList();
	}, []);

	/*
	 * useEffect(() => {
	 * console.log("climblist");
	 * console.log(sessionList);
	 * sessionList.forEach(climb => {
	 * climbsStore.addClimb({...climb});
	 * });
	 * console.log("check success of writing to climbStore");
	 * console.log(JSON.stringify(climbsStore));
	 * }, [setClimbList]);
	 */

	// TODO: Refactor to layout page

	if (!sessionList.length) {
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
				{/* eslint-disable-next-line react/prop-types */}
				<Button
					title={"Start a new session"}
					color={"blue"}
					onPress={() => createNewSession}
				/>
				<View style={styles.climbListContainer}>
					{sessionList.length > 0 &&
						sessionList.map((session, index) => (
							<View style={styles.climbItemContainer} key={index}>
								<Text style={styles.climbItemHeader}>
									{JSON.stringify(session)}
								</Text>
							</View>
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