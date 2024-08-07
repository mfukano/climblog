import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const STYLED_BLUE = "#326771";

type StyledButtonProps = {
	text: string
	style?: object
	onPress?: () => void 
	variant?: string
}

const StyledButton = React.forwardRef<View, StyledButtonProps>(function StyledButton({text, style, onPress, variant}, ref)  {
	let buttonStyle, textStyle;
	if (variant === "small") {
		buttonStyle = {...styles.viewButtonSmall};
		textStyle = {...styles.buttonTextSmall};
	} else {
		buttonStyle = {...styles.viewButtonLarge};
		textStyle = {...styles.buttonTextLarge};
	}

	return (
		<Pressable 
			ref={ref}
			onPress={onPress}
			style={({pressed}) => [
				{
					...styles.viewButtonBase,
					...buttonStyle,
					...style,
					opacity: pressed ? 0.7 : 1,
					shadowRadius: pressed ? 2 : 0,
					shadowColor: pressed ? "#999" : "none",
					shadowOpacity: pressed ? 1 : 0,
					shadowOffset: pressed ? {
						width: -1,
						height: -2,
					} : null 
				}
			]}
		>
			<Text style={{
				...styles.buttonTextBase,
				...textStyle
			}}>{text}</Text>
		</Pressable>
	);
});
StyledButton.displayName = "StyledButton";

const styles = StyleSheet.create({
	viewButtonBase: {
		backgroundColor: STYLED_BLUE,
		borderRadius: 5,
		elevation: 3,
		alignItems: "center",
	},
	viewButtonSmall: {
		padding: 4,
		paddingVertical: 8,
		paddingHorizontal: 16,
		margin: 6
	},
	viewButtonLarge: {
		paddingVertical: 20,
		paddingHorizontal: 32,
		margin: 20,
	},
	buttonTextBase: {
		color: "#fff",
		fontWeight: "bold",
	},
	buttonTextSmall: {
		fontSize: 14
	},
	buttonTextLarge: {
		fontSize: 20,
	}
});

export default StyledButton;