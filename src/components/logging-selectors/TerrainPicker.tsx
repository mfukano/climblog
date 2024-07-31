import React from "react";
import { View } from "react-native";
import { terrainTypes } from "../../constants/terrainTypes";
import Checkbox from "../basic-components/Checkbox";
import styles from "./styles";

interface TerrainProps {
	terrain: Array<string>
	setTerrain: React.Dispatch<React.SetStateAction<Array<string>>>
}

export default function TerrainPicker({ terrain, setTerrain }: TerrainProps) {
	const half = Math.ceil(terrainTypes.length / 2);

	return (
		<View style={styles.container}>
			<View style={styles.columnContainer}>
				<View style={styles.column}>
					{terrainTypes.slice(0, half).map((text, index) => (
						<Checkbox
							setState={setTerrain}
							state={terrain}
							text={text}
							key={index}
						/>
					))}
				</View>
				<View style={styles.column}>
					{terrainTypes.slice(half).map((text, index) => (
						<Checkbox
							setState={setTerrain}
							state={terrain}
							text={text}
							key={index + half}
						/>
					))}
				</View>
			</View>
		</View>
	);
}
