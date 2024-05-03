export type ClimbDB = {
  color: string
  discipline: string 
  grade: string
  terrain: string[] 
  problemHolds: string[]
  progress: string
}

export type Climb = ClimbDB | {
  dateStarted: Date,
  dateSent: Date,
  numSessionsBeforeSend: number
}