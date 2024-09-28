import * as React from "react";
import { 
	Image, 
	Pressable, 
	StyleSheet,
	Text, 
	ScrollView,
	View, 
	Dimensions
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { backgroundColorLight } from "@/src/constants/Colors";
import StyledButton from "@/src/components/basic-components/StyledButton";
import Timer from "@s/components/behavioral-components/Timer";
import Card from "@/src/components/basic-components/Card";
import HorizontalPicker from "@/src/components/basic-components/HorizontalPicker";
import { boulderGrades } from "@/src/constants/climbingGrades";
import { holdOrTapeColors } from "@/src/constants/holdOrTapeColors";

export default function TabProfileScreen() {
	// test

	const [imageClicked, setImageClicked] = React.useState(false);
	const [image, setImage] = React.useState(null);

	const [gradeValue, setGradeValue] = React.useState(boulderGrades[0]);
	const [colorValue, setColorValue] = React.useState(holdOrTapeColors[0]);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	// end test

	React.useEffect(() => {
		console.log(`
		a value has changed; dumping state:
		gradeValue: ${gradeValue}
		colorValue: ${colorValue}	
		`);
	}, [colorValue, gradeValue]);

	return (
		<ScrollView contentContainerStyle={styles.container}>

			{!image && <StyledButton style={{marginTop: 20}} text={"Upload climb image"} onPress={pickImage} />}
			{image && 
				<Pressable onPress={() => setImageClicked(!imageClicked)}>
					<Image source={{ uri: image }} style={imageClicked ? styles.imageLarge : styles.image} />
				</Pressable>
			}
			<Timer />

			<Card>
				<HorizontalPicker items={boulderGrades} stateVariable={gradeValue} stateSetFn={setGradeValue} />
				<HorizontalPicker items={holdOrTapeColors} stateVariable={colorValue} stateSetFn={setColorValue} />
			</Card>
		</ScrollView>
	);
}


const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: backgroundColorLight,
		display: "flex",
		flexDirection: "column",
		gap: 10,
		marginBottom: 50,
		width: "100%",
		height: 755, // this height is hardcoded but it should be reasonable to represent this with Dimension.get and adjusting
	},

	textinput: {
		backgroundColor: "white",
		borderColor: "black",
		borderStyle: "solid",
		borderWidth: 1,
		fontSize: 20,
		width: "50%",
	},
	image: {
		marginVertical: 10,
		width: 60,
		height: 60,
		resizeMode: "cover"
	},
	imageLarge: {
		width: Dimensions.get("window").width - 10,
		height: Dimensions.get("window").height - 200,
		margin: 10,
		borderRadius: 5,
		maxHeight: "100%",
		resizeMode: "cover",
	}
});