export type Session = {
  sessionDate: Date
  duration: string
  gym: string
  // climbs: number 
}

export type SessionDB = Session & {
  id: number
}