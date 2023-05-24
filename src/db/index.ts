import * as SQLite from 'expo-sqlite'

export const db: any = SQLite.openDatabase('climblog.db')
export type ResultError = Error | null

/** 
  thank you to @wheatandcat on Github for this pattern, it looks insanely helpful; src:
  https://github.com/wheatandcat/Peperomia/blob/master/src/lib/db/index.tsx
*/ 
export const success = (
  data: any,
  callback?: (data: any, error: ResultError) => void
) => {
  if (!callback) {
    return
  }
  callback(data, null)
}

export const error = (
  err: ResultError,
  callback?: (data: any, err: ResultError) => void
) => {
  console.log(err)
  if (!callback) {
    return
  }
  callback(null, err)
}