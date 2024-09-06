import StyledButton from "@/src/components/basic-components/StyledButton";
import useTimer from "@/src/hooks/db/useTimer";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "../basic-components/Card";

export default function Timer() {
	const {displayTime, setOngoing, clearTime} = useTimer();
	const ref = React.useRef(null);
	return (
		<Card>
			<View style={styles.wrapper}>
				<Text style={styles.largeText}>{displayTime}</Text>
				<View style={styles.container}>
					<StyledButton ref={ref} text={"Stop"} onPress={() => setOngoing(false)} />
					<StyledButton ref={ref} text={"Clear"} onPress={() => clearTime()} />
					<StyledButton ref={ref} text={"Start"} onPress={() => setOngoing(true)} />
				</View>
			</View>
		</Card>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 20,
		width: "100%",
		alignItems: "center",
		flexDirection: "column",
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "100%",
		gap: 20,
	},
	largeText: {
		fontSize: 36,
		paddingBottom: 16,
	}
});