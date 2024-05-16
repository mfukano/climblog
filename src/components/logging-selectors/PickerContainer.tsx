import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

type PickerContainerProps = {
	children: React.ReactNode;
};

export default function PickerContainer({ children }: PickerContainerProps) {
	// does some state need to be managed here?

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Climbing Discipline:</Text>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		textAlign: "center",
		fontSize: 20,
		flex: 1,
	},
	picker: {
		flex: 2,
	},
	pickerItem: {
		height: 120,
	},
});
