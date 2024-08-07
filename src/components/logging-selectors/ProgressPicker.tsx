import * as React from "react";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { pickerStyles } from "./styles";

interface ProgressProps {
	progress: string;
	setProgress: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProgressPicker({
	progress,
	setProgress,
}: ProgressProps) {
	return (
		<View style={pickerStyles.container}>
			<Picker
				itemStyle={pickerStyles.pickerItem}
				style={pickerStyles.picker}
				selectedValue={progress}
				onValueChange={(itemValue) => setProgress(itemValue)}
			>
				<Picker.Item
					label="Projecting"
					value="Projecting"
				></Picker.Item>
				<Picker.Item label="Sent" value="Sent"></Picker.Item>
			</Picker>
		</View>
	);
}
