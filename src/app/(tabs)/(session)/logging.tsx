import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	ScrollView,
	Text,
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
import { climbsStore } from "@s/store/climbStore";
import { router } from "expo-router";
import Card from "@/src/components/basic-components/Card";
import { backgroundColorLight } from "@/src/constants/Colors";
import StyledButton from "@/src/components/basic-components/StyledButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Climb } from "@/src/model/climb";
import { insertGym } from "@/src/helpers/gymAsyncStorage";

// TODO: I need to set up StackProps before react navigation can pass through the linter
// eslint-disable-next-line react/prop-types

/**
 * Logging screen is the location where climbs within a session are logged.
 * This may need access to sessionId in order to correctly route back to the active
 * session, but maybe something like `router.back()` would work instead. 
 * 
 * However, in order to add the sessionId into the sessions[] array that lives on Climb,
 * it would be a nice-to-have and a reasonable place to update this array so we can search
 * for climbs by session later.
 * @returns nothing, but inserts a climb into the database to be pulled later. 
 */
export default function LoggingScreen() {
	const queryClient = useQueryClient();
	const [color, setColor] = useState("Red");
	const [climbingDiscipline, setClimbingDiscipline] = useState("Boulder");
	const [grade, setGrade] = useState("V0");
	const [terrain, setTerrain] = useState([]);
	const [problemHolds, setProblemHolds] = useState([]);
	const [progress, setProgress] = useState("Projecting");
	const [climb, setClimb] = useState({});

	useEffect(() => {
		setClimb({
			"color": color,
			"climbingDiscipline": climbingDiscipline,
			"grade": grade,
			"progress": progress,
			"problemHolds": problemHolds,
			"terrain": terrain
		});
	}, [setColor, setClimbingDiscipline, setGrade, setTerrain, setProblemHolds, setProgress]);
	
	const insertClimbMutation = useMutation({
		mutationFn: (climbToInsert: Climb): Promise<number | void> => insertClimb(db, climbToInsert),
	
		/*
		 *  NOTE - We don't actually have to return the climbId because the 
		 *  following action isn't dependent on the climbId created by DB insertion.
		 */
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sessions"]});
			router.dismissAll();
			// router.navigate(`${sessionId}/active`);
			router.back();
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
	async function invokeNewClimbMutation(climb) {
		console.log("invoking {newClimbMutation}");
	
		const climbToInsert: Climb = climb || {
			color: color
		};
		await insertClimbMutation.mutate(climbToInsert);
	}
	
	const handleSubmit = () => {
		climbsStore.addClimb({
			color: color,
			discipline: climbingDiscipline,
			grade: grade,
			terrain: terrain,
			problemHolds: problemHolds,
			progress: progress,
		});
		async function createClimb () {

		}
		createClimb();
		// eslint-disable-next-line react/prop-types
		router.back();
	};

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

			<StyledButton style={{marginTop: 20}} text={"Submit Climb"} onPress={handleSubmit} />

			<Card style={{marginTop: 20, marginBottom: 30}}>
				<Divider text={"Page State"} />
				<Text>{climbingDiscipline}</Text>
				<Text>{grade}</Text>
				<Text>{terrain.join(",")}</Text>
				<Text>{problemHolds.join(",")}</Text>
				<Text>{progress}</Text>
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
