import * as SQLite from 'expo-sqlite'
import { create as createClimb } from './climb'
import { create as createSession } from './session'

export const db: any = SQLite.openDatabase('climblog.db')
export type ResultError = Error | null

/** 
  thank you to @wheatandcat on Github for this pattern, it looks insanely helpful; src:
  https://github.com/wheatandcat/Peperomia/blob/master/src/lib/db/index.tsx
*/ 
export const success = (
  data: any,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  if (!callback) {
    return
  }
  callback(data, null)
}

export const error = (
  err: SQLite.SQLError,
  callback?: (data: any, err: SQLite.SQLError | null) => void
) => {
  console.log(err)
  if (!callback) {
    return
  }
  callback(null, err)
  return true
}

export const init = (tx: SQLite.SQLTransaction) => {
  createClimb(tx)
  createSession(tx)
}