export type Climb = {
  color: string
  discipline: string
  grade: string
  terrain: string[]
  problemHolds: string[]
  progress: string
  sessions: number[]
}

export type ClimbDB = Climb & {
  dateStarted: Date,
  dateSent: Date,
  numSessionsBeforeSend: number
}