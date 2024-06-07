import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import useSessions from "@/src/hooks/db/useSessions";
import StyledButton from "@/src/components/basic-components/StyledButton";
import { Link } from "expo-router";

// TODO: I need to set up StackProps before I can run this through the linter
// eslint-disable-next-line react/prop-types
export default function ManageSessions() {
	console.log("loading index screen of sessions");
	const sessions = useSessions();
	const ref = React.useRef(null);

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
			<Link href={"/modal"} asChild>
				<StyledButton ref={ref} text={"Start a new session"} />
			</Link>
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
