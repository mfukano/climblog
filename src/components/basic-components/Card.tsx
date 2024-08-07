import React from "react";
import { StyleSheet, View } from "react-native";

type CardProps = {
	children: React.ReactNode
	style?: object
	ref?: React.ForwardedRef<string>
}

const Card = ({children, style}: CardProps) => {
	return (
		<View style={{...styles.card, ...style}}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingBottom: 10,
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		width: "90%",
	}
});

export default Card;