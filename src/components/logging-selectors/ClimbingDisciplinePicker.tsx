import * as React from "react"
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";



const ClimbingDisciplinePicker = ({climbingDiscipline, setClimbingDiscipline}) => {
  return (
    <View
      style={styles.container}
    >
      <Picker
        itemStyle={styles.pickerItem}
        style={styles.picker}
        selectedValue={climbingDiscipline}
        onValueChange={(itemValue, itemIndex) => setClimbingDiscipline(itemValue)}>
        <Picker.Item label="Boulder" value="Boulder"></Picker.Item>
        <Picker.Item label="Sport" value="Sport"></Picker.Item>
        <Picker.Item label="Toprope" value="Toprope"></Picker.Item>
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    flex: 1
  },
  pickerItem: {
    height: 120
  }
})

export default ClimbingDisciplinePicker