import * as React from "react"
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import { boulderGrades, ropeGrades } from "../../constants/climbingGrades";

const GradePicker = ({climbingDiscipline, selectedGrade, setSelectedGrade}) => {
  const gradesArray = climbingDiscipline == "Boulder" ? boulderGrades : ropeGrades

  return (
    <View
      style={styles.container}
    >
      <Picker
        itemStyle={styles.pickerItem}
        style={styles.picker}
        selectedValue={selectedGrade}
        onValueChange={(itemValue, itemIndex) => setSelectedGrade(itemValue)}
      >
        {
          gradesArray.map((grade, index) => (
            <Picker.Item label={grade} value={grade} key={index} />
          ))
        }
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
    flex: 2,
  },
  pickerItem: {
    height: 120
  }
})

export default GradePicker
