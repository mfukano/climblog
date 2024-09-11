import React from "react";
// import Picker from "react-native-picker-select";
import { Animated, StyleSheet, Text } from "react-native";
import { HorizontalScrollPicker } from "react-native-horizontal-scroll-picker";
import { View } from "react-native";

type PickerProps = {
	stateVariable: string,
	stateSetFn: (stateVariable) => void,
}

const ITEM_WIDTH = 40;
const ITEMS = Array.from(Array(15).keys()).map((val, idx) => {
	return {
		label: val,
		value: idx,
	};
});

export default function HorizantalPicker({
	stateVariable,
	stateSetFn
}: PickerProps) {
	// const [scrollX, setScrollX] = React.useState(new Animated.Value(20));
	const [selected, setSelected] = React.useState(3);

	const updateState = (newValue) => {
		console.log(`newValue: ${newValue}`);
		setSelected(newValue);
		stateSetFn(newValue);
	};

	const opacityAnimation = React.useRef(new Animated.Value(0)).current;
	const opacityStyle = { opacity: opacityAnimation };
    
	const animateOpacity = () => {
		Animated.timing(opacityAnimation, {
			toValue: 0,
			duration: 0,
			useNativeDriver: true
		}).start(() => {
			Animated.timing(opacityAnimation, {
				toValue: 1,
				duration: 0,
				useNativeDriver: true,
			}).start();
		});
	};

	return (
		<View id={"h-picker-test"} style={{
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
				selectorStyle={styles.selectorStyle}
				// scrollX={scrollX}
				/*
				 * textStyle={styles.textStyle}
				 * selectedTextStyle={styles.selectedTextStyle}
				 * itemStyle={styles.itemStyle}
				 */
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
	}
});