import * as SQLite from 'expo-sqlite'
import { Session as SessionParam } from '../model/session'
import { success, error } from './'

export type Session = SessionParam & {
  id?: string
}

export const create = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    `
      create table if not exists sessions (
        id integer primary key not null,
        sessionStart string,
        sessionEnd string,
        duration integer,
        climbs string
      )
    `,
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  )
}

export const write = async (
  tx: SQLite.SQLTransaction,
  session: Session,
  callback?: (data: Session, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    `
      insert into sessions
      (
        sessionStart,
        sessionEnd,
        duration,
        climbs
      )
      values (?, ?, ?, ?)
    `,
    [
      String(session.sessionStart),
      String(session.sessionEnd),
      session.duration,
      String(session.climbs)
    ],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  )
}