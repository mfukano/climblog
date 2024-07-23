import React from "react";
import { View } from "react-native";
import { DefaultText } from "../basic-components/TextStyles";

function ErrorRetrievingClimbs() {
	return (
		<View>
			<DefaultText>Error</DefaultText>
			<DefaultText>
			There has been an error retrieving the climbs from the
			database.
			</DefaultText>
		</View>
	);
}

function NoClimbsForSession() {
	return (
		<View>
			<DefaultText>There haven&apos;t been any climbs logged for this session yet! Go ahead and climb / log one first.</DefaultText>
		</View>
	);
}

export {
	ErrorRetrievingClimbs,
	NoClimbsForSession
};