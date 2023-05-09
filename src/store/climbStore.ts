let climbs = []
let listeners = []

export const climbsStore = {
  addClimb({ 
    color,
    discipline,
    grade,
    terrain,
    problemHolds,
    progress
  }) {
    climbs = [{
      climbingDiscipline: discipline,
      color: color,
      grade: grade,
      terrain: terrain,
      problemHolds: problemHolds,
      progress: progress 
    },
    ...climbs
  ]
    emitChange()
  },
  subscribe(listener) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  getSnapshot() {
    return climbs
  }
}

function emitChange() {
  for (let listener of listeners) {
    listener()
  }
}