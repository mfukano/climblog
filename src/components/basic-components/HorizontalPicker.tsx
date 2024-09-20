import React from "react";
// import Picker from "react-native-picker-select";
import { StyleSheet } from "react-native";
import { HorizontalScrollPicker } from "react-native-horizontal-scroll-picker";
import { View } from "react-native";

type PickerProps = {
	stateVariable: string,
	stateSetFn: (stateVariable) => void,
	items?: string[]
	selectorStyle?: object
}

/**
 * 
 * @param stateVariable - I was passing this in for some reason but I think I might not need to use it
 * @param stateSetFn - Passed setState() function to manage state for page using the picker
 * @param items - The string arrays to iterate over for picker items
 * @returns 
 */
export default function HorizantalPicker({
	stateVariable,
	stateSetFn,
	items,
	selectorStyle,
}: PickerProps) {
	// const [scrollX, setScrollX] = React.useState(new Animated.Value(20));
	const [selected, setSelected] = React.useState(0);

	const selectorStyleDarkColors = ["blue", "purple", "black"];
	const subArr = selectorStyle && selectorStyle["backgroundColor"] !== undefined
		? selectorStyleDarkColors.filter(str => str.includes(selectorStyle["backgroundColor"])) 
		: [];
	console.log(`check subArr: ${subArr}`);

	const textColorStyle = {};

	if (subArr.length > 0) {
		textColorStyle["color"] = "white";				
	}
	
	const itemsFallback = items || Array.from(Array(15).keys());

	const ITEMS = itemsFallback.map((val, idx) => {
		return {
			label: val,
			value: idx,
		};
	});

	const updateState = (newValue) => {
		console.log(`
			newValue: ${newValue}
			items[newValue]: ${items[newValue]}
		`);
		setSelected(newValue);
		stateSetFn(items[newValue]);
	};

	return (
		<View style={{
			/*
			 * width: "100%",
			 * height: 200,
			 */
		}}>
			<HorizontalScrollPicker
				items={ITEMS}
				onSelect={(newValue) => updateState(newValue)}
				initialIdx={selected}
				containerStyle={styles.container}
				selectorStyle={selectorStyle}
				textStyle={styles.textStyle}
				/*
				 * itemStyle={styles.itemStyle}
				 */
				selectedTextStyle={textColorStyle}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 100
	},
	itemStyle: {
		// padding: 20,
	},
	textStyle: {
	},
	selectedTextStyle: {
	},
	selectorStyle: {
		// backgroundColor: "cyan",
		borderWidth: 0,
	}
});