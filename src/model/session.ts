export type Session = {
  sessionDate: string 
  duration: string
  gym: string
  // climbs: number 
}

export type SessionDB = Session & {
  id: number
}