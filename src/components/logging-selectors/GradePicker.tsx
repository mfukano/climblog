import * as React from "react";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { boulderGrades, ropeGrades } from "../../constants/climbingGrades";
import { pickerStyles } from "./styles";

interface GradeProps {
	climbingDiscipline: string;
	selectedGrade: string;
	setSelectedGrade: React.Dispatch<React.SetStateAction<string>>;
}

export default function GradePicker({
	climbingDiscipline,
	selectedGrade,
	setSelectedGrade,
}: GradeProps) {
	const gradesArray =
		climbingDiscipline == "Boulder" ? boulderGrades : ropeGrades;

	return (
		<View style={pickerStyles.container}>
			<Picker
				itemStyle={pickerStyles.pickerItem}
				style={pickerStyles.picker}
				selectedValue={selectedGrade}
				onValueChange={(itemValue) => setSelectedGrade(itemValue)}
			>
				{gradesArray.map((grade, index) => (
					<Picker.Item label={grade} value={grade} key={index} />
				))}
			</Picker>
		</View>
	);
}
