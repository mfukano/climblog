import * as React from "react";
import { StyleSheet, View } from "react-native";
import { DefaultText } from "./TextStyles";

// eslint-disable-next-line react/prop-types
const Divider = ({ text }) => {
	return (
		<View style={styles.container}>
			<View style={styles.line} />
			<View>
				<DefaultText>{text}</DefaultText>
			</View>
			<View style={styles.line} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
	},
	line: {
		backgroundColor: "black",
		flex: 1,
		height: 1,
	},
	text: {
		fontSize: 20,
		margin: 20,
		textAlign: "center",
		width: 120,
	},
});

export default Divider;
