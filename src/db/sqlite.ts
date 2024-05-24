/* eslint-disable @typescript-eslint/no-unused-vars */
import { terrainTypes } from "./../constants/terrainTypes";
import * as SQLite from "expo-sqlite";
import { Climb, ClimbDB } from "../model/climb";
import { Session, SessionDB } from "../model/session";
import { assert } from "console";



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
const getSessions: 
(db: SQLite.SQLiteDatabase) => Promise<SessionDB[] | null>
= async (db: SQLite.SQLiteDatabase) => {
	console.log("Starting getSessions async query");
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

/**
 * `insertSession` should be the response for when a user is beginning to log their workout.
 * Sessions track frequency of workout, and climbs associate to sessions. 
 *  
 * @param successFunc 
 * sessionId - implicit. Should be tracked by  
 */
const insertSession = async (
	db: SQLite.SQLiteDatabase,
	session: Session) => {
	/*
	 * const db = await SQLite.openDatabaseAsync("@/assets/db/climblog.db")
	 * 	.then(db => {
	 * 		console.log("Successfully grabbed new DB access reference: ", JSON.stringify(db));
	 * 		return db;
	 * 	})
	 * 	.catch(e => console.error("Issue with opening DB reference: ", e));
	 * if (!db) {
	 * 	console.log("Wasn't able to open the database; returning.");
	 * 	return;
	 * }
	 */
	const result = await db.runAsync(insertSessionSql, {
		$sessionDate: session.sessionDate.toString(),
		$duration: 120,
		$gym: session.gym
	})
		.then(res => {
			console.log("finished insertSessionSql, result: ", res.lastInsertRowId, res.changes);
			return res.lastInsertRowId;
		}).catch(e => console.error("Error in insertSession: ", e));
	console.log("Returning the insertedRowId, or null, from insertSession", result);
	return result;
};

/** CLIMBS */

const getClimbsBySessionId = async (db: SQLite.SQLiteDatabase,
	sessionId: number) => {
	const result = await db.getAllAsync<ClimbDB>(getClimbsBySessionIdSql, {
		$sessionId: sessionId
	});
	return result;
};

const getClimb = async (db: SQLite.SQLiteDatabase) => {

};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const insertClimb = async (db: SQLite.SQLiteDatabase, climb: ClimbDB) => {
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
		$sessions: JSON.stringify(climb.sessions)
	});

	console.log("insertClimb results: ", 
		result.lastInsertRowId, 
		result.changes);
};


/** SECTION Debug */
const dropDatabaseTablesAsync = async (db: SQLite.SQLiteDatabase) => {
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

const createTablesAsync = async (db: SQLite.SQLiteDatabase) => {
	console.log("Starting createTablesSync");
	await Promise.all(
		[
			await db.runAsync(createSessionsTableSql.trim())
				.then(res => 
					console.log("setupSessionTable results: ", {...res})
				),

			await db.runAsync(createClimbsTableSql.trim())
				.then(res =>
					console.log("setupClimbTable results: ", {...res})
				),
			await db.runAsync(pragmaWALSql)
		]
	)
		.then(async () => {
			const tableNames = await db.getAllAsync("select name from sqlite_master where type='table'");
			console.log("table names", tableNames);
		});
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
		await seedSessions(db);
		await seedClimbs(db);

		await dbSanityCheck(db);
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
	await db.runAsync(insertSessionSql, {
		$sessionDate: "2024-01-01",
		$duration: 120,
		$gym: "Dogpatch Boulders",
	})
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
		$dateStarted: "2024-01-01", 
		$dateSent: "2024-01-01", 
		$sessions: "",
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
const pragmaWALSql = "PRAGMA journal_mode = WAL;";
const createSessionsTableSql = 
`
CREATE TABLE IF NOT EXISTS sessions (
	id integer primary key not null,
	sessionDate Date,
	duration integer,
	gym string
);
`;

const createClimbsTableSql = `
CREATE TABLE IF NOT EXISTS climbs (
	id integer primary key not null,
	color string,
	discipline string,
	grade string,
	terrain string,
	problemHolds string,
	progress string,
	dateStarted Date,
	dateSent Date,
	sessions string,
	numSessionsBeforeSend integer
);
`;

/** SESSIONS */
const insertSessionSql = 
`INSERT INTO sessions (
		sessionDate, 
		duration, 
		gym
	) 
	VALUES (
		$sessionDate, 
		$duration, 
		$gym
	)
	RETURNING *
	`;

const getSessionsByGymNameSql = 
`SELECT *
FROM sessions
WHERE gym = $gymName
ORDER BY id desc
`;
	
/** CLIMBS */
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

const getClimbsBySessionIdSql = 
`SELECT * 
FROM climbs
WHERE exists (
	SELECT 1 from json_each(sessions) WHERE VALUE = $sessionId
)
order by id desc;`;

/** SECTION Exports */
export {
	getClimbsBySessionId,
	getSessions,
	insertClimb,
	insertSession,
	setupTablesAsync,
	dropDatabaseTablesAsync,
};