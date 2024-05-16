/* eslint-disable react/prop-types */
import * as React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import toggleArrayElement from "@s/helpers/toggleArrayElement";

export default function Checkbox({ setState, state, text }) {
	return (
		<BouncyCheckbox
			text={text}
			textStyle={{ textDecorationLine: "none" }}
			onPress={() => setState(toggleArrayElement(state, text))}
		/>
	);
}
