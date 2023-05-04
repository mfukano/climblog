import * as React from "react"
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

const ProgressPicker = ({progress, setProgress}) => {
  return (
    <View
      style={styles.container}
    >
      <Picker
        itemStyle={styles.pickerItem}
        style={styles.picker}
        selectedValue={progress}
        onValueChange={(itemValue, itemIndex) => setProgress(itemValue)}>
        <Picker.Item label="Projecting" value="Projecting"></Picker.Item>
        <Picker.Item label="Sent" value="Sent"></Picker.Item>
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
    flex: 2
  },
  pickerItem: {
    height: 120
  }
})

export default ProgressPicker
