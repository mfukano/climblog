import React, {
	useEffect, 
	useState, 
	// useSyncExternalStore
} from "react";
import { Button, StyleSheet, ScrollView, Text, View, Pressable } from "react-native";
// import { Divider } from "../components/basic-components";
import { climbsStore } from "../store/climbStore";
// import { db } from "../db";
import { database } from "../db/sqlite";
import { Link } from "expo-router";

// TODO: I need to set up StackProps before I can run this through the linter
// eslint-disable-next-line react/prop-types
const SessionScreen = ({navigation}) => {
	const [sessionList, setSessionList] = useState([]);
	// const climbs = useSyncExternalStore(climbsStore.subscribe, climbsStore.getSnapshot);


	useEffect(() => {
		database.getSessions(setSessionList);
	}, []);

	// useEffect(() => {
		// console.log("climblist");
		// console.log(sessionList);
		// sessionList.forEach(climb => {
			// climbsStore.addClimb({...climb});
		// });
		// console.log("check success of writing to climbStore");
		// console.log(JSON.stringify(climbsStore));
	// }, [setClimbList]);

	// TODO: Refactor to layout page

	if (!sessionList.length) {
		return (
			<View>
				<Text>Error</Text>
				<Text>There has been an error retrieving the climbs from the database.</Text>  
			</View>);
	} else {

  

		return (
			<ScrollView contentContainerStyle={styles.container}>
				{ /* eslint-disable-next-line react/prop-types */ }
				<Button title={"Start a new session"} color={"blue"} onPress={() => navigation.navigate("Active Session")} />
				<View style={styles.climbListContainer}>
					{sessionList.length > 0 && sessionList.map((session, index) => (
						<View style={styles.climbItemContainer} key={index}>
							<Text style={styles.climbItemHeader}>{JSON.stringify(session)}</Text>
						</View>
					))
					}
				</View>
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		margin: 20,
		marginBottom: 50,
	},
	climbListContainer: {
		marginTop: 10,
		width: "100%"
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
	}
});

export default SessionScreen;