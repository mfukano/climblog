/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import useClimbsBySession from "@/src/hooks/db/useClimbsBySession";
import { NoClimbsForSession } from "@/src/components/page-errors/ClimbsPages";
import StyledButton from "@/src/components/basic-components/StyledButton";
import { formStyles } from "@/src/components/logging-selectors/styles";
import { PressableCard } from "@/src/components/basic-components/Card";

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
			<ScrollView contentContainerStyle={formStyles.container}>
				<Link href={`/logging?sessionId=${sessionId}`} asChild>
					<StyledButton text={"Log a Climb"} />	
				</Link>
				<NoClimbsForSession />
			</ScrollView>
		);
	} else {
		return (
			<ScrollView contentContainerStyle={formStyles.container}>
				<View style={{margin: 20,}}>
					<Link href={`/logging-new?sessionId=${sessionId}`} asChild>
						<StyledButton text={"Log a Climb"} />
					</Link>
				</View>
				<View style={formStyles.climbListContainer}>
					{climbsBySesh?.data?.map((climb, index) => (
						// <Link href=`/climb/${climbId}`/>
						<PressableCard style={formStyles.climbItemContainer} key={index}>
							<Text style={formStyles.climbItemHeader}>
								{climb.color} {climb.grade} {climb.terrain}
							</Text>
							{/* <Text>Terrain type: {climb.terrain}</Text> */}
							<Text>Problem holds: {climb.problemHolds}</Text>
							{/* <Text>Terrain type: {climb.terrain?.join(',')}</Text> */}
							{/* <Text>Problem holds: {climb.problemHolds.join(',')}</Text> */}
							<Text>Progress: {climb.progress}</Text>
						</PressableCard>
						// </Link>
					))}
				</View>
			</ScrollView>
		);
	}
}
