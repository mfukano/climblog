import React from "react";
import Picker from "react-native-picker-select";
import { View } from "react-native";

type PickerProps = {
	callback: () => void,
}

export default function HorizontalPicker({
	callback
}: PickerProps) {
	
	return (
		<View>

			<Picker>

			</Picker>
		</View>
	);
}