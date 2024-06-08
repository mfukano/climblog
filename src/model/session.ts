export type Session = {
  gymName: string
  startDateTime: string 
  duration?: number 
  isActive?: boolean
  endDateTime?: string 
}

export type SessionDB = Session & {
  id: number
}