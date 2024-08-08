import * as React from "react";
import { pickerStyles } from "./styles";
import { Text, View } from "react-native";

type PickerContainerProps = {
	children: React.ReactNode;
};

export default function PickerContainer({ children }: PickerContainerProps) {
	// does some state need to be managed here?

	return (
		<View style={pickerStyles.container}>
			<Text style={pickerStyles.label}>Climbing Discipline:</Text>
			{children}
		</View>
	);
}
