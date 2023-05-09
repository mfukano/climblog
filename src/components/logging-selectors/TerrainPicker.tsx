import { StyleSheet, Text, View } from "react-native"
import { terrainTypes } from "../../constants/terrainTypes"
import Checkbox from "../basic-components/Checkbox"

const TerrainPicker = ({ terrain, setTerrain }) => {
  const half = Math.ceil(terrainTypes.length/2)

  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        <View style={styles.column}>
          {terrainTypes.slice(0, half).map((text, index) => (
            <Checkbox setState={setTerrain} state={terrain} text={text} key={index} />
          ))}
        </View>
        <View style={styles.column}>
          {terrainTypes.slice(half).map((text, index) => (
            <Checkbox setState={setTerrain} state={terrain} text={text} key={index+half} />
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  column: {
    gap: 10
  }
})

export default TerrainPicker