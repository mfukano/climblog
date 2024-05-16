/* eslint-disable @typescript-eslint/no-unused-vars */
import { terrainTypes } from "./../constants/terrainTypes";
import * as SQLite from "expo-sqlite";
import { Climb, ClimbDB } from "../model/climb";
import { Session, SessionDB } from "../model/session";


/** SECTION Setup */
const db = SQLite.openDatabase("climblog.db");


/** SECTION CRUD */
/** SESSIONS */
const getSessions = async () => {
	const result = await db.getAllAsync(`
	SELECT *
	FROM sessions
	LIMIT 10
	ORDER BY id desc
	RETURNING *;
	`);  

	console.log(`getSessions results: ${JSON.stringify(result)}`);
	return result;
};

/**
 * `insertSession` should be the response for when a user is beginning to log their workout.
 * Sessions track frequency of workout, and climbs associate to sessions. 
 *  
 * @param successFunc 
 * sessionId - implicit. Should be tracked by  
 */
const insertSession = async (session: Session) => {
	try {
		const result = await insertSessionSql.executeAsync<Session>({
			$sessionDate: session.sessionDate.toString(),
			$gym: session.gym
		});
		console.log("finished insertSessionSql, result: ", result.lastInsertRowId, result.changes);
		return result.lastInsertRowId;
	} finally {
		await insertSessionSql.finalizeAsync();
	}
};

/** CLIMBS */

const getClimbsBySessionId = async (sessionId: number) => {
	try {
		const result = await getClimbsBySessionIdSql.executeAsync({
			$sessionId: sessionId
		});

		const allRows = await result.getAllAsync();

		return allRows;
	} finally {
		await getClimbsBySessionIdSql.finalizeAsync();
	}
};

const getClimb = async () => {

};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const insertClimb = async (climb: ClimbDB) => {
	try {
		const insertClimbRes = await insertClimbSql.executeAsync({
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
			insertClimbRes.lastInsertRowId, 
			insertClimbRes.changes);
	} finally {
		await insertClimbSql.finalizeAsync();
	}
};


/** SECTION Debug */
const dropDatabaseTablesAsync = async () => {
	const dropTablesRes = await db.runAsync(`
		DROP TABLE IF EXISTS sessions;
		DROP TABLE IF EXISTS climbs;
	`); 
	console.log("dropTables results: ", dropTablesRes.changes);
};

const setupTablesAsync = async () => {
	console.log("Starting setupTablesAsync");
	const setupRes = await db.runAsync(`
		PRAGMA journal_mode = WAL;
		CREATE TABLE IF NOT EXISTS sessions (
			id integer primary key not null,
			sessionDate Date,
			duration integer,
			gym string,
		);

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
	`); 
	console.log("setupTables results: ", setupRes.lastInsertRowId, setupRes.changes);

	await seedSessions();
	await seedClimbs();
};

const seedSessions = async () => {
	try {
		const result = await insertSessionSql.executeAsync({
			$sessionDate: "2024-01-01",
			$duration: 120,
			$gym: "Dogpatch Boulders",
		});
		console.log("seedSessions should be completed; below is the returned rows");
		console.log(result.lastInsertRowId, result.changes);
		for await (const row of result) {
			console.log("record:", row);
		}
	} finally {
		await insertClimbSql.finalizeAsync();
	}
};

const seedClimbs = async () => {
	try {
		const result = await insertClimbSql.executeAsync({
			$color: "red", 
			$discipline: "boulder", 
			$grade: "V2", 
			$terrain: "slab", 
			$problemHolds: "crimp", 
			$progress: "sent", 
			$dateStarted: "2024-01-01", 
			$dateSent: "2024-01-01", 
			$numSessionsBeforeSend: 1
		});
		console.log("seedClimbs should be completed; below is the result of executeAsync");
		console.log(result.lastInsertRowId, result.changes);
	
		for await (const row of result) {
			console.log(JSON.stringify(row));
		}
	} finally {
		await insertClimbSql.finalizeAsync();
	}
};

/** SECTION Prepared Statements */
/** SESSIONS */
const insertSessionSql = await db.prepareAsync(
	`INSERT INTO sessions (
		sessionDate, 
		duration, 
		gym, 
	) 
	VALUES (
		$sessionDate, 
		$duration, 
		$gym, 
	)
	RETURNING *
	`
);

const getSessionsByGymNameSql = await db.prepareAsync(
	`SELECT *
	FROM sessions
	WHERE gym = $gymName
	ORDER BY id desc
	`
);

/** CLIMBS */
const insertClimbSql = await db.prepareAsync(
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
	RETURNING *`
);

const getClimbsBySessionIdSql = await db.prepareAsync(
	`SELECT * 
	FROM climbs
	WHERE exists (
		SELECT 1 from json_each(sessions) WHERE VALUE = $sessionId
	)
	order by id desc;
	`
);

/** SECTION Exports */
export const database = {
	getClimbsBySessionId,
	getSessions,
	insertClimb,
	insertSession,
	setupTablesAsync,
	dropDatabaseTablesAsync,
};