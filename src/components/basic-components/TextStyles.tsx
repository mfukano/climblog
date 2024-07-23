import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

type StyledTextProps = {
	children: React.ReactNode
}

function DefaultText({ children }: StyledTextProps) {
	return (
		<Text style={styles.text}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
	}
});

export {
	DefaultText	
};