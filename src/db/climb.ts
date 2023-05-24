import * as SQLite from 'expo-sqlite'
import { Climb as ClimbParam } from '../model/climb'
import { success, error } from './'

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
        grade string,
        terrain JSON,
        problemHolds JSON,
        progress string
        dateStarted Date,
        dateSent Date,
      )
    `,
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  )
}