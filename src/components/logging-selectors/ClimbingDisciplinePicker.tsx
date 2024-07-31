import * as React from "react";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import styles from "./styles";

interface DisciplineProps {
	climbingDiscipline: string;
	setClimbingDiscipline: React.Dispatch<React.SetStateAction<string>>;
}

export default function ClimbingDisciplinePicker({
	climbingDiscipline,
	setClimbingDiscipline,
}: DisciplineProps) {
	return (
		<View style={styles.container}>
			<Picker
				itemStyle={styles.pickerItem}
				style={styles.picker}
				selectedValue={climbingDiscipline}
				onValueChange={(itemValue) => setClimbingDiscipline(itemValue)}
			>
				<Picker.Item label="Boulder" value="Boulder"></Picker.Item>
				<Picker.Item label="Sport" value="Sport"></Picker.Item>
				<Picker.Item label="Toprope" value="Toprope"></Picker.Item>
			</Picker>
		</View>
	);
}
