import React from "react";

import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabase("climblog.db");

/**
 * Each session will insert n climbs being worked on or sent during the session
 * In this way, we need to perform the session creation first, retain the session id
 * and link each climb subsequently with the session id
 */
// const getSessions = (setSessionFunc) => {
// 	db.transaction(
// 		tx => {
// 			tx.executeSql(
// 				"select * from sessions",
// 				[],
// 				(_, { rows: { _array } }) => {
// 					setSessionFunc(_array);
// 				}
// 			);
// 		},
// 		(error) => { console.log("db error load sessions"); console.log(error); },
// 		() => { console.log("loaded climbs"); }
// 	);
// };

const getClimbs = () => {
	const res = db.transaction(tx => {
		const res = tx.executeSql(
			"select * from climbs", 
			[],
			(_, res) => { console.log("get climbs results"); console.log(JSON.stringify(res.rows._array)); return res.rows._array }
		)
		return res
	})
	console.log(`completed getClimbs results:`)
	console.log(JSON.stringify(res))
	return res
}

const insertSession = (sessionId, successFunc) => {
	db.transaction(tx => {
		tx.executeSql("insert statement"),
		[],
		(error) => { console.log("db error"); console.log(error); };
		() => { successFunc(); };
	});
};

const dropDatabaseTablesAsync = async () => {
	await db.transactionAsync(async tx => {
		await tx.executeSqlAsync(`drop table if exists sessions`);
		await tx.executeSqlAsync(`drop table if exists climbs`);
	})
};

const setupDatabaseAsync = async () => {
	await db.transactionAsync(async tx => {
		// const setupResult = await Promise.all([
			await tx.executeSqlAsync(
				`create table if not exists sessions (
					id integer primary key not null,
					sessionStart string,
					sessionEnd string,
					duration integer,
					climbs string
				);`
			);
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
			);
		// 	),
		// ])

		// console.log("finished database setup; below is created tables")
		// console.log(setupResult)
	}) 
};

const setupSessionsAsync = async () => {
	await db.transactionAsync(async tx => {
		const setupResult = await tx.executeSqlAsync(
			`insert into sessions (
				id, sessionStart, sessionEnd, duration, climbs	
			) 
			values (?, ?, ?, ?, ?)`,
			[
				1, "", "", 120, "seed data"
			]
		)
		console.log("setup should be completed; below is the returned rows")
		console.log(setupResult.rows)
	})
}


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
			values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[1, "red", "boulder", "V2", "slab", "crimp", "sent", "2024-01-01", "2024-01-01", 1]
		)
		console.log("setup should be completed; below is the returned rows")
		console.log(setupResult.rows)
	})
}


export const database = {
	// getSessions,
	getClimbs,
	insertSession,
	setupDatabaseAsync,
	setupClimbsAsync,
	setupSessionsAsync,
	dropDatabaseTablesAsync,
}