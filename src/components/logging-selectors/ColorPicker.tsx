import * as React from "react";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { holdOrTapeColors } from "../../constants/holdOrTapeColors";
import { pickerStyles } from "./styles";

interface ColorProps {
	color: string;
	setColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function ColorPicker({ color, setColor }: ColorProps) {
	return (
		<View style={pickerStyles.container}>
			<Picker
				itemStyle={pickerStyles.pickerItem}
				style={pickerStyles.picker}
				selectedValue={color}
				onValueChange={(itemValue) => setColor(itemValue)}
			>
				{holdOrTapeColors.map((color, index) => (
					<Picker.Item label={color} value={color} key={index} />
				))}
			</Picker>
		</View>
	);
}
