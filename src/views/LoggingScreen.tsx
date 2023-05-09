import React, {useState} from 'react'
import { Button, StyleSheet, ScrollView, View, Text, TextInput } from 'react-native'
import { ColorPicker, ClimbingDisciplinePicker, GradePicker, ProgressPicker, TerrainPicker, ProblematicHoldsPicker } from '../components/logging-selectors'
import { Divider } from '../components/basic-components'
import { climbsStore } from '../store/climbStore'

const LoggingScreen = ({ navigation }) => {
  const [color, setColor] = useState("Red")
  const [climbingDiscipline, setClimbingDiscipline] = useState("Boulder")
  const [grade, setGrade] = useState("V0")
  const [terrain, setTerrain] = useState([])
  const [problemHolds, setProblemHolds] = useState([])
  const [progress, setProgress] = useState("Projecting")

  const handleSubmit = () => {
    climbsStore.addClimb({
      color: color,
      discipline: climbingDiscipline,
      grade: grade,
      terrain: terrain,
      problemHolds: problemHolds,
      progress: progress
    })
    navigation.goBack()
  } 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Divider text={"Discipline"} />
      <ClimbingDisciplinePicker climbingDiscipline={climbingDiscipline} setClimbingDiscipline={setClimbingDiscipline}/>
      <Divider text={"Hold Or Tape Color"} />
      <ColorPicker color={color} setColor={setColor} />
      <Divider text={"Grade"} />
      <GradePicker climbingDiscipline={climbingDiscipline} selectedGrade={grade} setSelectedGrade={setGrade} />
      <Divider text={"Terrain"} />
      <TerrainPicker terrain={terrain} setTerrain={setTerrain} />
      <Divider text={"Problematic Holds"} />
      <ProblematicHoldsPicker problemHolds={problemHolds} setProblemHolds={setProblemHolds} />
      <Divider text={"Progress"} />
      <ProgressPicker progress={progress} setProgress={setProgress} />
      <Button title={"Submit Climb"} color={"blue"} onPress={handleSubmit}/>

      <Divider text={"Page State"} />
      <View style={styles.container}>
        <Text>{climbingDiscipline}</Text>
        <Text>{grade}</Text>
        <Text>{terrain.join(',')}</Text>
        <Text>{problemHolds.join(',')}</Text>
        <Text>{progress}</Text>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 20,
    marginBottom: 50,
  },

  textinput: {
    backgroundColor: 'white',
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 20,
    width: '50%',
  }
})

export default LoggingScreen