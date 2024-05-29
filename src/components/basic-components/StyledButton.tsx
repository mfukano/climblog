import { Link } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const STYLED_BLUE = "#326771";

type StyledButtonProps = {
	href?: string
	text: string
	onPress?: () => void 
}


const StyledButton = (({href, text, onPress}: StyledButtonProps) => {
	console.log(`
	href: ${href}
	text: ${text}
	onPress: ${JSON.stringify(onPress)}`);

	return (
		<Link href={href ? href : "#"} asChild>
			<Pressable 
				onPress={onPress}
				style={({pressed}) => [
					{
						...styles.viewButton,
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
				<View style={styles.viewButton}>
					<Text style={styles.buttonText}>{text}</Text>
				</View>
			</Pressable>
		</Link>
	);
});

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
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
		padding: 10,
		fontWeight: "bold",
	}
});

export default StyledButton;