import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const STYLED_BLUE = "#326771";

type StyledButtonProps = {
	text: string
	style?: object
	onPress?: () => void 
}

const StyledButton = React.forwardRef<View, StyledButtonProps>(function StyledButton({text, style, onPress}, ref)  {
	return (
		<Pressable 
			ref={ref}
			onPress={onPress}
			style={({pressed}) => [
				{
					...styles.viewButton,
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
			<Text style={styles.buttonText}>{text}</Text>
		</Pressable>
	);
});
StyledButton.displayName = "StyledButton";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	viewButton: {
		padding: 10,
		backgroundColor: STYLED_BLUE,
		borderRadius: 5,
		paddingVertical: 12,
		paddingHorizontal: 32,
		elevation: 3,
		alignItems: "center",
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
		padding: 10,
		fontWeight: "bold",
	}
});

export default StyledButton;