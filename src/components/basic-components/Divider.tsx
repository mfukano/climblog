import * as React from "react";
import { StyleSheet, View } from "react-native";
import { DefaultText } from "./TextStyles";

// eslint-disable-next-line react/prop-types
const Divider = ({ text }) => {
	return (
		<View style={styles.container}>
			<DefaultText>{text}</DefaultText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		borderBottomWidth: 1,
		padding: 15,
		width: "100%",
		textAlign: "center",
		justifyContent: "center"
	},
	/*
	 * line: {
	 * 	backgroundColor: "black",
	 * 	flex: 1,
	 * 	height: 1,
	 * 	// margin: 20,
	 * 	width: "100%",
	 * },
	 */
	text: {
		fontSize: 20,
		margin: 20,
		textAlign: "center",
		width: "100%",
	},
});

export default Divider;
