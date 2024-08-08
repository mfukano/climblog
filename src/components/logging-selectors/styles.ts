import { StyleSheet } from "react-native";

const pickerStyles = StyleSheet.create({
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

const formStyles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 50,
		width: "100%",
	},
	climbListContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		width: "90%",
		marginTop: -10,

	},
	climbItemContainer: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 3,
		width: "100%",
		marginTop: 10,
	},
	climbItemHeader: {
		fontWeight: "bold",
	},
	textinput: {
		backgroundColor: "white",
		borderColor: "black",
		borderStyle: "solid",
		borderWidth: 1,
		fontSize: 20,
		width: "30%",
	},
});

export {
	pickerStyles,
	formStyles,
};