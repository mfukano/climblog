import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import useSessions from "@/src/hooks/db/useSessions";
import StyledButton from "@/src/components/basic-components/StyledButton";
import { Link } from "expo-router";
import { formatDate, formatTime } from "@/src/helpers/dateHelper";
import { PressableCard } from "@/src/components/basic-components/Card";

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
				<Text>Whoops...</Text>
				<Text>
					There has been a problem retrieving the sessions from the
					database.
				</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={{margin: 20,}}>
				<Link href={"/modal"} asChild>
					<StyledButton ref={ref} text={"Start a new session"} />
				</Link>
			</View>
			<View style={styles.climbListContainer}>
				{sessions?.data?.map((session, index) => (
					
					<Link href={`/${session.id}/active`} key={session.id} asChild>
						<PressableCard style={{...styles.climbItemContainer}} key={index}>
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
						</PressableCard>
					</Link>
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
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		width: "90%",
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
