import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	ScrollView,
	Text,
	View,
} from "react-native";
import {
	ColorPicker,
	ClimbingDisciplinePicker,
	GradePicker,
	ProgressPicker,
	TerrainPicker,
	ProblematicHoldsPicker,
} from "@s/components/logging-selectors";
import { Divider } from "@s/components/basic-components";
import { router, useLocalSearchParams } from "expo-router";
import Card from "@/src/components/basic-components/Card";
import { backgroundColorLight } from "@/src/constants/Colors";
import StyledButton from "@/src/components/basic-components/StyledButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Climb } from "@/src/model/climb";
import { insertClimb } from "@/src/db/sqlite";
import { useSQLiteContext } from "expo-sqlite";

// TODO: I need to set up StackProps before react navigation can pass through the linter
// eslint-disable-next-line react/prop-types

/**
 * Logging screen is the location where climbs within a session are logged.
 * This may need access to sessionId in order to correctly route back to the active
 * session, but maybe something like `router.back()` would work instead. 
 * 
 * Logging screen likely also needs optional access to the climbing ID or model; 
 * if loading by the climb ID, the only mutable fields should be:
 * 	- problemHolds
 *  - terrain (maybe?)
 *  - progress
 * 
 * On update submit, if the current sessionId is NOT contained within sessions[],
 * we should add it. 
 * 
 * However, in order to add the sessionId into the sessions[] array that lives on Climb,
 * it would be a nice-to-have and a reasonable place to update this array so we can search
 * for climbs by session later.
 * @returns nothing, but inserts a climb into the database to be pulled later. 
 */
export default function LoggingScreen() {
	const db = useSQLiteContext();
	const queryClient = useQueryClient();

	const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
	const [color, setColor] = useState("Red");
	const [climbingDiscipline, setClimbingDiscipline] = useState("Boulder");
	const [grade, setGrade] = useState("V0");
	const [terrain, setTerrain] = useState([]);
	const [problemHolds, setProblemHolds] = useState([]);
	const [progress, setProgress] = useState("Projecting");
	const [climb, setClimb] = useState({
		"color": color,
		"discipline": climbingDiscipline,
		"grade": grade,
		"progress": progress,
		"problemHolds": problemHolds,
		"terrain": terrain,
		"sessions": [parseInt(sessionId)]
	});

	useEffect(() => {
		setClimb({
			...climb,
			"color": color,
			"discipline": climbingDiscipline,
			"grade": grade,
			"progress": progress,
			"problemHolds": problemHolds,
			"terrain": terrain,
		});
	}, [color, climbingDiscipline, grade, terrain, problemHolds, progress]);
	
	const insertClimbMutation = useMutation({
		mutationFn: (climb: Climb): Promise<void> => insertClimb(db, climb),
	
		/*
		 *  NOTE - We don't actually have to return the climbId because the 
		 *  following action isn't dependent on the climbId created by DB insertion.
		 */
		onSuccess: () => {
			console.log("insertClimbMutation success");
			queryClient.invalidateQueries({ queryKey: ["climbs"] });
			// router.back();
		},
		onSettled: () => {
			router.navigate(`${sessionId}/active`);
		}
	});

	/**
	 * insertClimb should probably use something like this, where the mutation is being called on the page
	 * after the climb is ready to insert. Right now, it's literally only tapping climbsStore, which we 
	 * don't actually need since we can do the invalidation of the queryClient returned queries.
	 * 
	 * createNewSession occurs after the modal for currentGym name selection occurs.
	 * @currentGym String param accepted from the modal after input.
	 */
	async function invokeNewClimbMutation() {
		console.log("invoking {newClimbMutation}");
		console.log(`check climb to insert:
			${JSON.stringify(climb)}
		`);
		await insertClimbMutation.mutateAsync(climb);
	}
	
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Card style={{marginTop: 10}}>
				<Divider text={"Discipline"} />
				<ClimbingDisciplinePicker
					climbingDiscipline={climbingDiscipline}
					setClimbingDiscipline={setClimbingDiscipline}
				/>
			</Card>
			<Card>
				<Divider text={"Hold Or Tape Color"} />
				<ColorPicker color={color} setColor={setColor} />
			</Card>
			<Card>
				<Divider text={"Grade"} />
				<GradePicker
					climbingDiscipline={climbingDiscipline}
					selectedGrade={grade}
					setSelectedGrade={setGrade}
				/>
			</Card>
			<Card>
				<Divider text={"Terrain"} />
				<TerrainPicker terrain={terrain} setTerrain={setTerrain} />
			</Card>
			<Card>
				<Divider text={"Problematic Holds"} />
				<ProblematicHoldsPicker
					problemHolds={problemHolds}
					setProblemHolds={setProblemHolds}
				/>
			</Card>
			<Card>
				<Divider text={"Progress"} />
				<ProgressPicker progress={progress} setProgress={setProgress} />
			</Card>

			<StyledButton style={{marginTop: 20}} text={"Submit Climb"} onPress={invokeNewClimbMutation} />

			<Card style={{
				marginTop: 20, 
				marginBottom: 30,
			}}>
				<Divider text={"Page State"} />

				<View style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					// gap: 80,
					margin: 20
				}}>

					<View style={{
						display: "flex",
						alignContent: "space-around",
						
					}}>
						<Text>Discipline: </Text>
						<Text>Color: </Text>
						<Text>Grade: </Text>
						<Text>Terrain: </Text>
						<Text>Problem Holds: </Text>
						<Text>Progress: </Text>
					</View>
			
					<View style={{
					}}>
						<Text>{climbingDiscipline}</Text>
						<Text>{color}</Text>
						<Text>{grade}</Text>
						<Text>{terrain.length > 0 ? terrain.join(", "): "none"}</Text>
						<Text>{problemHolds.length > 0 ? problemHolds.join(", ") : "none"}</Text>
						<Text>{progress}</Text>
					</View>

				</View>


			</Card>
		
		</ScrollView>
	
	);

}



const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: backgroundColorLight,
		display: "flex",
		flexDirection: "column",
		gap: 10,
		marginBottom: 50,
		width: "100%",
	},

	textinput: {
		backgroundColor: "white",
		borderColor: "black",
		borderStyle: "solid",
		borderWidth: 1,
		fontSize: 20,
		width: "50%",
	},
});
