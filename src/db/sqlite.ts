import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("climblog.db");

/** SECTION Setup */
export const connectToDatabase = async () => {
	return SQLite.openDatabase(
		"climblog.db",
		undefined,
		"",
		undefined,
		(db: SQLite.SQLiteDatabase) => {
			console.log("Created DB: ", db);
		}
	);
};

/** SECTION CRUD */

const getClimbs = (set) => {
	db.transaction(tx => {
		tx.executeSql(
			"select * from climbs",
			[],
			(_, { rows: { _array } }) => {
				console.log("[getClimbs] {db.transaction} {tx.executesql} get climbs results");
				console.log(_array);
				set(_array);
			}
		);
	});
};

const getSessions = (set) => {
	db.transaction(tx => {
		tx.executeSql(
			"select * from sessions",
			[],
			(_, { rows: { _array } }) => {
				console.log("[getSessions] {db.transaction} {tx.executesql} get sessions results");
				console.log(_array);
				set(_array);
			}
		);
	});
};


/**
 * `insertSession` should be the response for when a user is beginning to log their workout.
 * Sessions track frequency of workout, and climbs point  
 *  
 * @param successFunc 
 * sessionId - implicit. Should be tracked by  
 */
const insertSession = (sessionId, successFunc) => {
	db.transaction(tx => {
		tx.executeSql("insert statement"),
		[],
		(error) => { console.log("db error"); console.log(error); };
		() => { successFunc(); };
	});
};

/** SECTION Debug */

const dropDatabaseTablesAsync = async () => {
	await db.transactionAsync(async tx => {
		await tx.executeSqlAsync("drop table if exists sessions");
		await tx.executeSqlAsync("drop table if exists climbs");
	});
};

const setupDatabaseAsync = async () => {
	await db.transactionAsync(async tx => {
		const setupResult = await Promise.all([
			await tx.executeSqlAsync(
				`create table if not exists sessions (
					id integer primary key not null,
					sessionStart string,
					sessionEnd string,
					duration integer,
					climbs string
			);`),
			await tx.executeSqlAsync(
				`create table if not exists climbs (
					id integer primary key not null,
					color string,
					discipline string,
					grade string,
					terrain string,
					problemHolds string,
					progress string,
					dateStarted Date,
					dateSent Date,
					numSessionsBeforeSend integer
				);`
			)]);
		console.log("setup should be completed; below is the created tables:");
		console.log(setupResult.forEach((table, idx) => console.log(`table ${idx}: \n` + table.rows)));
	}).then(() => console.log("finished database setup; below is created tables"));
};

const setupSessionsAsync = async () => {
	await db.transactionAsync(async tx => {
		const setupResult = await tx.executeSqlAsync(
			`insert into sessions (
				id, sessionStart, sessionEnd, duration, climbs	
			) 
			values (?, ?, ?, ?, ?)
			returning *`,
			[
				1, "", "", 120, "seed data"
			]
		);
		console.log("setup should be completed; below is the returned rows");
		console.log(setupResult.rows);
	});
};

const setupClimbsAsync = async () => {
	await db.transactionAsync(async tx => {
		const setupResult = await tx.executeSqlAsync(
			`insert into climbs (
				id, 
				color, 
				discipline, 
				grade, 
				terrain, 
				problemHolds, 
				progress, 
				dateStarted, 
				dateSent, 
				numSessionsBeforeSend 
			) 
			values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			returning *`,
			[1, "red", "boulder", "V2", "slab", "crimp", "sent", "2024-01-01", "2024-01-01", 1]
		);
		console.log("setup should be completed; below is the returned rows");
		console.log(setupResult.rows);
	});
};

/** SECTION Exports */

export const database = {
	getSessions,
	getClimbs,
	insertSession,
	setupDatabaseAsync,
	setupClimbsAsync,
	setupSessionsAsync,
	dropDatabaseTablesAsync,
};