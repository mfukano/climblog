import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import useSessions from "@/src/hooks/db/useSessions";
import StyledButton from "@/src/components/basic-components/StyledButton";
import { Link } from "expo-router";
import { formatDate, formatTime } from "@/src/helpers/dateHelper";
import Card from "@/src/components/basic-components/Card";

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
					<Card style={{...styles.climbItemContainer}} key={index}>
						<Text style={styles.climbItemHeader}>
							{/* For debugging session model {JSON.stringify(session)} */}
							{session.gymName}
						</Text>
						<Text>
							{formatDate(session.startDateTime)}
						</Text>
						<Text>
							{formatTime(session.duration)}
						</Text>
						{session.isActive === true &&
						<Text>Active</Text>
						}

						<Link href={`${session.id}/active`} key={session.id} asChild>
							<StyledButton ref={ref} text={"View session"} variant={"small"} />
						</Link>
					</Card>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 50,
		width: "100%",
	},
	climbListContainer: {
		width: "100%",
		marginTop: -10,
	},
	climbItemContainer: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 3,
		width: "100%",
		marginTop: 10,
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
