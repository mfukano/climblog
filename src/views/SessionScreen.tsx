import React, {useEffect, useState, useSyncExternalStore} from 'react'
import { Button, StyleSheet, ScrollView, Text, View } from 'react-native'
import { Divider } from '../components/basic-components'
import { climbsStore } from '../store/climbStore'
import { db } from '../db'
import { database } from '../db/sqlite'

const SessionScreen = ({ navigation }) => {
  const [climbList, setClimbList] = useState([])
  const climbs = useSyncExternalStore(climbsStore.subscribe, climbsStore.getSnapshot)


  useEffect(() => {
    database.getClimbs(setClimbList)
  }, [])

  useEffect(() => {
    console.log(`climblist`)
    console.log(climbList)
    climbList.forEach(climb => {
      climbsStore.addClimb({...climb})
    })
    console.log("check success of writing to climbStore")
    console.log(JSON.stringify(climbsStore))
  }, [setClimbList])

  // TODO: Refactor to layout page

  if (!climbList.length) {
    return (
    <View>
      <Text>Error</Text>
      <Text>There has been an error retrieving the climbs from the database.</Text>  
    </View>)
  } else {

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title={"Log a Climb"} color={"blue"} onPress={() => navigation.navigate("Log Climb")} />
      <View style={styles.climbListContainer}>
        {climbList.length > 0 && climbList.map((climb, index) => (
          <View style={styles.climbItemContainer} key={index}>
            <Text style={styles.climbItemHeader}>{climb.color} {climb.grade}</Text>
            <Text>Terrain type: {climb.terrain}</Text>
            <Text>Problem holds: {climb.problemHolds}</Text>
            {/* <Text>Terrain type: {climb.terrain?.join(',')}</Text> */}
            {/* <Text>Problem holds: {climb.problemHolds.join(',')}</Text> */}
            <Text>Progress: {climb.progress}</Text>
          </View>
        ))
        }
      </View>
    </ScrollView>
  )
}
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