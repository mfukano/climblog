import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type CardProps = {
	children: React.ReactNode
	style?: object
	onPress?: () => void 
	ref?: React.ForwardedRef<string>
}

const Card = ({children, style}: CardProps) => {
	return (
		<View style={{...styles.card, ...style}}>
			{children}
		</View>
	);
};

export const PressableCard = React.forwardRef<View, CardProps>(function PressableCard({children, style, onPress}, ref) { 
	return (
		<Pressable onPress={onPress} style={({pressed}) => [
			{
				...styles.card, 
				...style,
				borderColor: pressed ? "#000" : null,
				borderWidth: pressed ? 2 : 0,
				shadowRadius: 4,
				shadowColor: pressed ? "#999" : "#777",
				shadowOpacity: pressed ? 1 : 0.4,
				shadowOffset: pressed ? {	
					height: -2,
					width: -1,
				} : {
					width: 2,
					height: 3
				} 
			}
		]} 
		ref={ref}>
			{children}
		</Pressable>
	);
});

const styles = StyleSheet.create({
	card: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between", 
		// paddingBottom: 10,
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		width: "90%",
		shadowRadius: 4,
		shadowColor: "#777",
		shadowOpacity: 0.4,
		shadowOffset: {
			height: 3,
			width: 2,
		}
	}
});

export default Card;