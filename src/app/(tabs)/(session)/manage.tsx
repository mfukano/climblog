import React, { useEffect, useState } from "react";
import { Button, StyleSheet, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import useSessions from "@/src/hooks/db/useSessions";
import { useSQLiteContext } from "expo-sqlite";
import { insertSession } from "@/src/db/sqlite";
import useClimbsBySession from "@/src/hooks/db/useClimbsBySession";
import useInsertSession from "@/src/hooks/db/useInsertSession";
import { Session } from "@/src/model/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// TODO: I need to set up StackProps before I can run this through the linter
// eslint-disable-next-line react/prop-types
export default function ManageSessions() {
	console.log("loading index screen of sessions");
	const queryClient = useQueryClient();
	const sessions = useSessions();
	const db = useSQLiteContext();

	const insertClimbMutation = useMutation({
		mutationFn: (sessionToInsert: Session): Promise<number | void> => insertSession(db, sessionToInsert),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sessions"]});
			router.navigate(`/${insertClimbMutation.data}/active`);
		}
		
	});
	// const climbs = useSyncExternalStore(climbsStore.subscribe, climbsStore.getSnapshot);

	/**
	 * createNewSession occurs after the modal for gym name selection occurs.
	 * This function should probably live on that modal.
	 * @gym String param accepted from the modal after input.
	 */
	async function createNewSession(session: Session = null) {
	// gym: string
		console.log("invoking createNewSession");
	
		const sessionToInsert: Session = session || {
			gym: "Dogpatch Boulders",
			duration: "120",
			sessionDate: (new Date()).toString()
		};
	
		insertClimbMutation.mutate(sessionToInsert);
	}

	// TODO: Refactor to layout page

	console.log(`sessions data: ${JSON.stringify(sessions?.data)}`);

	if (!sessions?.data?.length) {
		return (
			<View>
				<Text>Error</Text>
				<Text>
					There has been an error retrieving the sessions from the
					database.
				</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Button
				title={"Start a new session"}
				color={"blue"}
				onPress={async () => await createNewSession()}
			/>
			<View style={styles.climbListContainer}>
				{sessions?.data?.map((session, index) => (
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
