import React, {useSyncExternalStore} from 'react'
import { Button, StyleSheet, ScrollView, Text, View } from 'react-native'
import { Divider } from '../components/basic-components'
import { climbsStore } from '../store/climbStore'

const SessionScreen = ({ navigation }) => {
  const climbs = useSyncExternalStore(climbsStore.subscribe, climbsStore.getSnapshot)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title={"Log a Climb"} color={"blue"} onPress={() => navigation.navigate("Log Climb")} />
      <View style={styles.climbListContainer}>
        {climbs.length > 0 && climbs.map((climb, index) => (
          <View style={styles.climbItemContainer} key={index}>
            <Text style={styles.climbItemHeader}>{climb.color} {climb.grade}</Text>
            <Text>Terrain type: {climb.terrain.join(',')}</Text>
            <Text>Problem holds: {climb.problemHolds.join(',')}</Text>
            <Text>Progress: {climb.progress}</Text>
          </View>
        ))
        }
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
  climbListContainer: {
    marginTop: 10,
    width: "100%"
  },
  climbItemContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 3,
    margin: 10,
  },
  climbItemHeader: {
    fontWeight: "bold",
  },
  textinput: {
    backgroundColor: 'white',
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 20,
    width: '30%',
  }
})

export default SessionScreen