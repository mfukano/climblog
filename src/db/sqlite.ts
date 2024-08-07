/* eslint-disable @typescript-eslint/no-unused-vars */
import { terrainTypes } from "./../constants/terrainTypes";
import * as SQLite from "expo-sqlite";
import { Climb, ClimbDB } from "../model/climb";
import { Session, SessionDB } from "../model/session";

/** SECTION Generic helper functions */

/**
 * `makeSessionRecord` used to create SQLiteBindParams but instead now checks to see which columns exist
 * on a session object and now instead return whether or not the session object is in the shape that we 
 * expect, except after casting it to a SQLiteBindParams object. We should probably perform this checking
 * first and construct the desired object with alternative values if the object doesn't exist, then serialize
 * it into the shape of SQLiteBindParams. 
 * @param session Session model from the front-end to submit for SQLiteBindParams creation
 * @returns { success, message, sessionObj } This is an object that contains three values:
 * 	@returns { success } determines if sessionObj is the shape we expect, this should be checked first.
 * 	@returns { message } lets us know whether session is in the right shape and the error message if it is not
 *  @returns { sessionObj } a session cast into the form of SQLiteBindParams for passing to our SQLite queries 
 */
const makeSessionRecord = (session: Session) => {
	/**
	 * validateSession doesn't actually _need_ to run because it's only being created internally;
	 * the only thing that needs to be validated are the columns
	 */
	const validationResults = processSessionFields(session);
	const { success, message, sessionObj } = { ...validationResults };
	if (success) {
		return new Error("Session isn't the right shape: ", message);
	}
	console.log(`sessionObj shape: ${JSON.stringify(sessionObj)}`);
	return { success, message, sessionObj };
};


/**
 * `ProcessSessionFields` should be a builder step to create the object to dump into 
 * `makeSessionRecord`, which creates the SQLiteBindParams to pass into the query.
 * I want named params in my SQLite query functions, so I think I'll probably need to
 * fully dump the object into BindParams format every time.
 *
 * I don't so much need to validate the session parameter, 
 * which is created only through interfacing with forms in my application,
 * and instead need to determine which fields exist on session so we can insert
 * SQL query fields instead.
 * 
 * ALTERNATELY, WE OVERRIDE THE EXISTING SESSION RECORD FULLY EVERY TIME.
 * We will already have pulled the prior shape of any object at the time into
 * forms to populate them, so we can do field processing and calculation for duration
 * here as well.
 * @param session
 */
type PostProcessedSession = ReturnType<typeof processSessionFields>
const processSessionFields = (session: Session) => {
	let success = false;
	let message;
	
	/*
	 * determine which fields exist on the input session object
	 * OR map to all fields in the session 
	 */
	
	const sessionObj: SQLite.SQLiteBindParams = {
		$gymName: session.gymName,
		$startDateTime: session.startDateTime,
		$duration: session.duration || 0,
		$isActive: session.isActive || true,
		$endDateTime: session.endDateTime || ""
	};
	
	if (sessionObj.gymName!.valueOf() !== null
	&& sessionObj.startDateTime!.valueOf() !== null
	&& sessionObj.isActive !== null
	&& typeof sessionObj.duration === "number"
	&& typeof sessionObj.endDateTime === "string"
	) {
		success = true;
		message = `Session object is correct: ${JSON.stringify(sessionObj)}`;
		return { success, message, sessionObj };
	}

	message = `Session object didn't pass validation: ${JSON.stringify(sessionObj)}`;

	// calculate duration on session object
	return { success, message, sessionObj };
};

/** SECTION Setup */
/*
 * async function setup() {
 * 	const db = await SQLite.openDatabaseAsync("@/assets/db/climblog.db", { 
 * 		useNewConnection: true,
 * 		enableChangeListener: true,
 * 	});
 * 	return db;
 * }
 */


/** SECTION CRUD */
/** SESSIONS */

/**
 * `insertSession` is called when a user selects a gym to work out at. 
 * Sessions track frequency of workout, and climbs associate to sessions. 
 * I want to abstract session serialization so I can generate default database
 * records with a subset of parameters very soon.
 *  
 * @param db		: database from SQLiteProvider in @s/app/_layout.tsx
 * @param session 	: session data to insert 
 * @returns sessionId - implicit. To be optionally used with  
 */
const insertSession = async (
	db: SQLite.SQLiteDatabase,
	session: Session
) => {
	
	// session validation
	
	const result = await db.runAsync(insertSessionSql, {
		$startDateTime: session.startDateTime.toString(),
		$duration: session.duration,
		$gymName: session.gymName,
		$isActive: session.isActive || 0
	})
		.then(res => {
			console.log("finished insertSessionSql, result: ", res.lastInsertRowId, res.changes);
			return res.lastInsertRowId;
		}).catch(e => console.error("Error in insertSession: ", e));
	console.log("Returning the insertedRowId, or null, from insertSession", result);
	return result;
};

const getSessions:
(db: SQLite.SQLiteDatabase) => Promise<SessionDB[] | null>
= async (db: SQLite.SQLiteDatabase) => {
	console.log("Starting getSessions async query");
	
	// TODO: This should be extracted and paginated
	const result: Promise<SessionDB[] | null> = db.getAllAsync<SessionDB>(`
		SELECT *
		FROM sessions
		ORDER BY id DESC;
	`).then(result => {
		console.log(`getSessions results: ${JSON.stringify(result)}`);
		return result;
	}).catch(e => {
		console.error("Error in getSessions: ", e);
		return null;
	});
	return result;
};

const updateSession = async (
	db: SQLite.SQLiteDatabase,
	session: Session
) => {
	/*
	 * TODO implement update session
	 *  Update session should be able to set a session as ended
	 */
};

const deleteSession = async (
	db: SQLite.SQLiteDatabase,
	session: Session
) => {
	
	//TODO implement delete session
};

/** CLIMBS */

const getClimbsBySessionId = async (
	db: SQLite.SQLiteDatabase,
	sessionId: number
) => { 
	console.log("GET CLIMBS BY SESSION ID");
	console.log(`check sessionId before calling getClimbsBySessionId: ${sessionId}`);
	const res = await db.getAllAsync<ClimbDB>(getClimbsBySessionIdSql, {
		$sessionId: sessionId
	});
	console.log(!res || res.length < 1  
		? "There were no records to retrieve, but the query was successful"
		: `Retrieved ${res.length} records: ${JSON.stringify(res)}`);

	console.log(`printing res at the end of getClimbsBySessionId: ${JSON.stringify(res)}`);
	return res;
};

const getClimbs = async (
	db: SQLite.SQLiteDatabase,
) => {
	const res = await db.getAllAsync<ClimbDB>("select * from climbs order by id desc");
	return res;
};

const getClimb = async (db: SQLite.SQLiteDatabase) => {
	
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const insertClimb = async (
	db: SQLite.SQLiteDatabase,
	climb: Climb
) => {
	const result = await db.runAsync(insertClimbSql, {
		$color: climb.color,
		$discipline: climb.discipline,
		$grade: climb.grade,
		$terrain: JSON.stringify(climb.terrain),
		$problemHolds: JSON.stringify(climb.problemHolds),
		$progress: climb.progress,
		$dateStarted: new Date().toDateString(),
		$dateSent: climb.progress === "sent"
			? new Date().toDateString()
			: null,
		$numSessionsBeforeSend: climb.progress === "sent"
			? climb.sessions.length
			: null,
		$sessions: JSON.stringify(climb.sessions),
	});
	
	console.log("insertClimb results: ",
		result.lastInsertRowId,
		result.changes);
};
	
const updateClimb = async (
	db: SQLite.SQLiteDatabase,
	climb: ClimbDB
) => {
	/*
	 * validate shape of climb
	 *  
	 */
};
	
/** SECTION Debug */
const dropDatabaseTablesAsync = async (
	db: SQLite.SQLiteDatabase
) => {
	await Promise.all([
		await db.runAsync(`
			DROP TABLE IF EXISTS sessions;
		`)
			.then(result => console.log("dropSessions results: ", result.changes))
			.catch(e => console.error("Issue dropping sessions", e)),
		await db.runAsync(`		
			DROP TABLE IF EXISTS climbs;
		`)
			.then(result => console.log("dropClimbs results: ", result.changes))
			.catch(e => console.error("Issue dropping climbs", e))
	])
		.catch(e => console.error(`dropTableIssue: ${e}`));
				
	return db;
};
			
const createTablesAsync = async (
	db: SQLite.SQLiteDatabase
) => {
	console.log("Starting createTablesSync");
	// await Promise.all([
	await db.runAsync(createSessionsTableSql.trim())	
		.then(res =>
			console.log("setupSessionTable results: ", { ...res })
		);	
		
	await db.runAsync(createClimbsTableSql.trim())
		.then(res =>
			console.log("setupClimbTable results: ", { ...res })
		);
	await db.runAsync("PRAGMA journal_mode = WAL;")	;
	/*
	 * ])
	 * .then(async () => {
	 */
	const tableNames = await db.getAllAsync("select name from sqlite_master where type='table'");
	console.log("table names", tableNames);
	// });
	return db;
};
			
/**
 * It turns out this may not need to be async (or shouldn't?).
 * Most of the work that needs to be done here is setting up sessions
 * and climbs table after dropping them; both of these things are simply
 * debug tasks. However, we need to make sure that the tables are created
 * or exist in _some_ capacity.
 * @param db I've been passing along the DB for all of my promise calls since
 * it helps retain the access point a little more easily. 
 * @returns nothing 
 */
const setupTablesAsync = async (db: SQLite.SQLiteDatabase) => {
	await createTablesAsync(db);
				
	try {
		Promise.all([
			seedSessions(db), 
			seedClimbs(db), 
		]).then(() => 
			dbSanityCheck(db)
		);
	} catch (e) {
		console.error("Issue in seeding tables: ", e);
	} finally {
		console.log("{finally} Finished setupTables");
	}
				
	return db;
};
			
const dbSanityCheck = async (db: SQLite.SQLiteDatabase) => {
	const [sesh, climbs] = await Promise.all([
		await db.getAllAsync("select * from sessions"),
		await db.getAllAsync("select * from climbs"),
	]);
	console.log(`dbSanityCheck results:
	sesh: ${JSON.stringify(sesh)}
	climbs: ${JSON.stringify(climbs)}`);
};
				
const seedSessions = async (db: SQLite.SQLiteDatabase) => {
	console.log("seeding sessions");
	await db.runAsync(
		`insert into sessions (
			startDateTime,
			endDateTime,
			duration,
			gymName,
			isActive
		) values (
		 	?, ?, ?, ?, ?
		)`, [
			"Mon Jan 1 2024 00:00:00",
			3600,
			"Mon Jan 1 2024 01:00:00",
			"Dogpatch Boulders",
			false
		]
	)
		.then(res => {
			console.log("seedSessions should be completed; below is the returned rows");
			console.log(res.lastInsertRowId, res.changes);
		})
		.catch(e => console.error(`Issue with seeding sessions: ${e}`));
					
	return db;
};
				
const seedClimbs = async (db: SQLite.SQLiteDatabase) => {
	console.log("seeding climbs");
					
	await db.runAsync(insertClimbSql, {
		$color: "red",
		$discipline: "boulder",
		$grade: "V2",
		$terrain: "slab",
		$problemHolds: "crimp",
		$progress: "sent",
		$dateStarted: "Mon Jan 1 2024 00:00:00",
		$dateSent: "Mon Jan 1 2024 00:00:00",
		$sessions: JSON.stringify([1]),
		$numSessionsBeforeSend: 1
	})
		.then(res => {
			console.log("seedClimbs should be completed; below is the result of executeAsync");
			console.log(res.lastInsertRowId, res.changes);
		})
		.catch(e => console.error(`Issue with seeding climbs: \n${JSON.stringify(e)}\n${e}`));
};
				
/** SECTION Prepared Statements */
/** TABLES */
const createSessionsTableSql = `
CREATE TABLE IF NOT EXISTS sessions (
	id INTEGER PRIMARY KEY NOT NULL,
	startDateTime DATE,
	endDateTime DATE,
	duration NUMERIC,
	gymName TEXT,
	isActive BOOLEAN 
);`;
				
const createClimbsTableSql = `
CREATE TABLE IF NOT EXISTS climbs (
	id INTEGER PRIMARY KEY NOT NULL,
	color TEXT,
	discipline TEXT,
	grade TEXT,
	terrain TEXT,
	problemHolds TEXT,
	progress TEXT,
	dateStarted DATE,
	dateSent DATE,
	sessions TEXT,
	numSessionsBeforeSend INTEGER
);`;
				
/** SESSIONS */
// Does this need RETURNING *? Am I even using insertSessionSql?
const insertSessionSql =
`INSERT INTO sessions (
		startDateTime, 
		duration, 
		gymName
	) 
VALUES (
		$startDateTime, 
		$duration, 
		$gymName
	)
RETURNING *
`;
				
const getSessionsByGymNameSql =
`SELECT *
FROM sessions
WHERE gymName = $gymName
ORDER BY id desc
`;
				
/** CLIMBS */
// Do I even need RETURNING *? Does this ACTUALLY RETURN ANYTHING
const insertClimbSql =
`INSERT INTO climbs (
	color,
	discipline,
	grade,
	terrain,
	problemHolds,
	progress,
	dateStarted,
	dateSent,
	sessions,
	numSessionsBeforeSend
)
VALUES (
	$color,
	$discipline,
	$grade,
	$terrain,
	$problemHolds,
	$progress,
	$dateStarted,
	$dateSent,
	$sessions,
	$numSessionsBeforeSend
)
RETURNING *`;
				
// Changing the WHERE clause to try and solve getClimbsBySessionSql
const getClimbsBySessionIdSql =
`SELECT * 
FROM climbs c
WHERE EXISTS(
	SELECT * from json_each(c.sessions) WHERE VALUE = $sessionId
)
order by id desc
`;

/*
 * exists (
 * 	SELECT 1 from json_each(climbs.sessions) WHERE VALUE LIKE $sessionId
 * )
 */
/** SECTION Exports */
export {
	getClimbs,
	getClimbsBySessionId,
	getSessions,
	insertClimb,
	insertSession,
	setupTablesAsync,
	updateClimb,
	updateSession,
	dropDatabaseTablesAsync,
};
				