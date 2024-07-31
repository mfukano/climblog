import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		marginTop: 10,
	},
	columnContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 20,
	},
	column: {
		gap: 10,
		marginRight: 7,
	},
	label: {
		textAlign: "center",
		fontSize: 20,
		flex: 1,
	},
	picker: {
		flex: 2,
	},
	pickerItem: {
		height: 120,
	},
});

export default styles;