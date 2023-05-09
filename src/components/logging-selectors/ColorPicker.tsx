import * as React from "react"
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import { holdOrTapeColors } from "../../constants/holdOrTapeColors";

const ColorPicker = ({color, setColor}) => {
  return (
    <View
      style={styles.container}
    >
      <Picker
        itemStyle={styles.pickerItem}
        style={styles.picker}
        selectedValue={color}
        onValueChange={itemValue => setColor(itemValue)}
      >
        {
          holdOrTapeColors.map((color, index) => (
            <Picker.Item label={color} value={color} key={index} />
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

export default ColorPicker
