import React from "react";
// import Picker from "react-native-picker-select";
import { StyleSheet } from "react-native";
import { HorizontalScrollPicker } from "react-native-horizontal-scroll-picker";

type PickerProps = {
	stateSetFn: React.Dispatch<React.SetStateAction<string>>;
	items?: string[];
};

/**
 *
 * @param stateVariable - I was passing this in for some reason but I think I might not need to use it
 * @param stateSetFn - Passed setState() function to manage state for page using the picker
 * @param items - The string arrays to iterate over for picker items
 * @returns
 */
export default function HorizantalPicker({ stateSetFn, items }: PickerProps) {
	const [selected, setSelected] = React.useState(0);

	const itemsFallback =
		items || Array.from(Array(15).keys()).map((a) => a.toString());

	const ITEMS = itemsFallback.map((val: string, idx: number) => {
		return {
			label: val,
			value: idx,
		};
	});

	const updateState = (newValue: number) => {
		setSelected(newValue);
		stateSetFn(items[newValue]);
	};

	return (
		<HorizontalScrollPicker
			items={ITEMS}
			onSelect={(newValue: number) => updateState(newValue)}
			initialIdx={selected}
			containerStyle={styles.container}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 100,
	},
});

