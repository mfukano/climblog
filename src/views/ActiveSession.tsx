/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { database } from "../db/sqlite";

const ActiveSession = ({ navigation }) => {
	// const [sessionId, setSessionId] = useState(0);
	const [climbList, setClimbList] = useState([]);
	
	useEffect(() => {
		database.getClimbs(setClimbList);
	}, []);
	
	if (!climbList.length) {
		return (
			<View>
				<Text>Error</Text>
				<Text>
			There has been an error retrieving the climbs from the database.
				</Text>
			</View>
		);
	} else {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Button
					title={"Log a Climb"}
					color={"blue"}
					onPress={() => navigation.navigate("Log Climb")}
				/>
				<View style={styles.climbListContainer}>
					{climbList.length > 0 &&
				climbList.map((climb, index) => (
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
				))}
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

export default ActiveSession;
	