import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { insertSession } from "@/src/db/sqlite";
import { Session } from "@/src/model/session";
import StyledButton from "@/src/components/basic-components/StyledButton";
import useGyms from "@/src/hooks/db/useGyms";
import { insertGym } from "@/src/helpers/gymAsyncStorage";
import GymListFragment from "@/src/components/behavioral-components/GymList";
import { DefaultText } from "@/src/components/basic-components/TextStyles";

/**
 *	Modal is an intermediate step to creating a session, and part of the UI smoothing process.
 *	When a user wants to start a session, we ask which gym they want to climb at, and create the 
 *	session in the background using that string.
 *
 *	End game: This writes a `recentGyms` line to the user's profile and allows for retrieving recent
 *	pastGyms. These gym entries may use geo data eventually, 
 *	but we don't necessarily want them to unless the user wants that.
 * @returns 
 */
export default function Modal() {
	/*
	 * If the page was reloaded or navigated to directly, then the modal should be presented as
	 * a full screen page. You may need to change the UI to account for this.
	 */
	
	/*
	 * Right now, setGym is called on every value change. I think that this
	 * could actually be debounced and is a little bit wasteful for state update
	 * memory, and I also think that this behavior should filter through the list
	 * of previous pastGyms.
	 */
	const [currentGym, setGym] = React.useState("");
	const [pastGyms] = useGyms();
	const queryClient = useQueryClient();
	const db = useSQLiteContext();
	
	const insertSessionMutation = useMutation({
		mutationFn: (sessionToInsert: Session): Promise<number | void> => insertSession(db, sessionToInsert),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sessions"]});
			router.dismissAll();
			router.navigate(`/${insertSessionMutation.data}/active`);
		}
	});
	
	/**
	 * createNewSession occurs after the modal for currentGym name selection occurs.
	 * @currentGym String param accepted from the modal after input.
	 */
	async function invokeNewSessionMutation(session: Session = null) {
		// currentGym: string
		console.log("invoking createNewSession");
		
		const sessionToInsert: Session = session || {
			gym: currentGym,
			duration: "0",
			sessionDate: (new Date()).toString()
		};
		await insertGym(currentGym, pastGyms).then(() => insertSessionMutation.mutate(sessionToInsert));
	}
	
	const isPresented = router.canGoBack();
	
	return (
		<View style={styles.wrapper}>
			<View style={styles.formContainer}>
				<DefaultText>Which gym are you climbing at today?</DefaultText>
				<TextInput 
					style={styles.textInput}
					placeholder="Dogpatch Boulders" 
					onChangeText={setGym}
					value={currentGym}
				/>
				<StyledButton text={"Start climbing!"} onPress={() => invokeNewSessionMutation()} /> 
		
				{/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
				{!isPresented && <Link href="../">Dismiss</Link>}
				{/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
				<StatusBar style="light" />
			</View>
			<View style={styles.scrollViewContainer}>
				{pastGyms && pastGyms.length > 0 
					? (
						<GymListFragment currentGym={currentGym}/>
					)
					: (
						<DefaultText>
							You haven&apos;t been to any gyms yet!
							Please enter a currentGym name instead.
						</DefaultText>
					)}
			</View>
			
		</View>
	);
}
	
const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	formContainer: {
		height: "30%",
		width: "100%",
		justifyContent: "center",
		backgroundColor: "#fff",
		padding: 10
	},
	scrollViewContainer: {
		height: "70%",
		width: "100%",
		justifyContent: "flex-start",
		backgroundColor: "#fff",
		padding: 10
	},
	text: {
		fontSize: 20,
	},
	textInput: {
		margin: 20,
		padding: 10,
		fontSize: 20,
	},
	viewButton: {
		padding: 10,
		backgroundColor: "#66ee22",
		borderRadius: 5,
		shadowRadius: 2,
		shadowColor: "#999",
		shadowOpacity: 1,
		shadowOffset: {
			width: 1,
			height: 2,
		}
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
		padding: 10,
		fontWeight: "bold",
	}
});