import * as SQLite from 'expo-sqlite'
import { Climb as ClimbParam } from '../model/climb'
import { success, error } from './'

interface SQLParams {
  tx: SQLite.SQLTransaction,
  callback?: (data: any, error: SQLite.SQLError | null) => void
}

export type Climb = ClimbParam & {
  id?: string
  dateStarted: Date
  dateSent: Date
}

export const create = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    `
      create table if not exists climbs (
        id integer primary key not null,
        color string,
        discipline string,
        grade string,
        terrain string,
        problemHolds string,
        progress string
        dateStarted Date,
        dateSent Date,
        numSessionsBeforeSend integer,
      )
    `,
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  )
}

// TODO: add and test write and get methods based on the example
export const write = async (
    tx: SQLite.SQLTransaction,
    climb: Climb,
    callback?: (data: Climb, error: SQLite.SQLError | null) => void
  ) => {
  return tx.executeSql(
    ` 
      insert into climbs 
      (
        color,
        discipline,
        grade, 
        terrain, 
        problemHolds, 
        progress, 
        dateStarted, 
        dateSent, 
        numSessionsBeforeSend
      )
      values (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      climb.color,
      climb.discipline,
      climb.grade,
      String(climb.terrain),
      String(climb.problemHolds),
      climb.progress,
      String(climb.dateStarted),
      String(climb.dateSent),
      String(climb.numSessionsBeforeSend),
    ],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  )
}

// need to see if this works and we can get some handle on how to work the rest of the calls
export const get = async (
  tx: SQLite.SQLTransaction,
  climb?: Climb,
  callback?: (data: [Climb], error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    climb
      ? `select climb from climbs where id = climb.id`
      : `select * from climbs`,
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  )
}