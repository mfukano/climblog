let climbs = [];
let listeners = [];

/**
 *`climbsStore` is a struct that takes form data from LoggingScreen and retains it temporarily.
 *I feel it's possible to link this store with a state manager like context to write or delete directly
 *to the database with a 
 */
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
		];
		emitChange();
	},
	subscribe(listener) {
		listeners = [...listeners, listener];
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	},
	getSnapshot() {
		return climbs;
	}
};

function emitChange() {
	for (const listener of listeners) {
		console.log(`listener is: ${JSON.stringify(listener)}`);
		listener();
	}
}