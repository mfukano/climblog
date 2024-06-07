export type Climb = {
  color: string
  discipline: string
  grade: string
  terrain: string[]
  problemHolds: string[]
  progress: string
}

export type ClimbDB = Climb & {
  dateStarted: Date,
  dateSent: Date,
  sessions: string[]
  numSessionsBeforeSend: number
}