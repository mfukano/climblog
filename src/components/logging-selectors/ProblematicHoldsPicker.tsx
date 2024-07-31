import * as React from "react";
import { View } from "react-native";
import Checkbox from "../basic-components/Checkbox";
import { holdTypes } from "../../constants/holdTypes";
import styles from "./styles";

interface ProblematicProps {
	problemHolds: Array<string>;
	setProblemHolds: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function ProblematicHoldsPicker({
	problemHolds,
	setProblemHolds,
}: ProblematicProps) {
	const half = Math.ceil(holdTypes.length / 2);

	return (
		<View style={styles.container}>
			<View style={styles.columnContainer}>
				<View style={styles.column}>
					{holdTypes.slice(0, half).map((text, index) => (
						<Checkbox
							setState={setProblemHolds}
							state={problemHolds}
							text={text}
							key={index}
						/>
					))}
				</View>
				<View style={styles.column}>
					{holdTypes.slice(half).map((text, index) => (
						<Checkbox
							setState={setProblemHolds}
							state={problemHolds}
							text={text}
							key={index + half}
						/>
					))}
				</View>
			</View>
		</View>
	);
}
