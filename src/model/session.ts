export type Session = {
  gymName: string
  startDateTime: string 
  duration?: number 
  isActive?: boolean
  endDateTime?: string 
}
/*
 * session should be able to determine if it's actively running or not
 * so that if we reopen from a dismissed state, we can check to see if we 
 * need to restore to an active session or to delete the session data if the
 * current date is different from the session start date, or if the session
 * IS actually overnight, we should check to see if this is something the user 
 * wants to restore back to. admittedly, this is a pretty major edge case.
 */

export type SessionDB = Session & {
  id: number
}