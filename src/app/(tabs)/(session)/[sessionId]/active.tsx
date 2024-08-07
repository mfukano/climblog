/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import useClimbsBySession from "@/src/hooks/db/useClimbsBySession";
import { NoClimbsForSession } from "@/src/components/page-errors/ClimbsPages";
import StyledButton from "@/src/components/basic-components/StyledButton";

export default function ActiveSessionPage() {
	// Session ID to be passed to NewSession after creating on /manage
	const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
	const climbsBySesh = useClimbsBySession(parseInt(sessionId));
	const navigation = useNavigation();

	console.log(`check session ID existence: ${sessionId}`);

	useEffect(() => {
		navigation.setOptions({ 
			title: "Active Session",
			headerBackTitle: "Sessions",
		});
	}, [navigation]);	

	/*
	 * if (!climbsBySesh.isLoading && !climbsBySesh.isSuccess) {
	 * 	return (
	 * 		<ScrollView contentContainerStyle={styles.container}>
	 * 			<Link href="/logging" asChild>
	 * 				<StyledButton text={"Log a Climb"} />	
	 * 			</Link>
	 * 			<ErrorRetrievingClimbs />
	 * 		</ScrollView>
	 * 	);
	 * }
	 */
	/**
	 *	check length and return  
	 */
	// }
	if (!climbsBySesh?.data || !climbsBySesh?.data.length) {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Link href={`/logging?sessionId=${sessionId}`} asChild>
					<StyledButton text={"Log a Climb"} />	
				</Link>
				<NoClimbsForSession />
			</ScrollView>
		);
	} else {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Link href={`/logging?sessionId=${sessionId}`} asChild>
					<StyledButton text={"Log a Climb"} />
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
