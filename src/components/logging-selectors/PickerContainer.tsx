import * as React from "react";
import styles from "./styles";
import { Text, View } from "react-native";

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
