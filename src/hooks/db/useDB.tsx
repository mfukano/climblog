import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import React from "react";

import { dropDatabaseTablesAsync, setupTablesAsync } from "@s/db/sqlite";
import { openDatabaseAsync } from "expo-sqlite";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const localDatabase = require("@/assets/db/climblog.db");
const dbName = "climblog.db";

export default function useDatabase() {
	const [isDBLoading, setDBLoading] = React.useState(false);

	const createDB = async() => {
		setDBLoading(true);
		try {
			if (
				!(
					await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)
				).exists
			) {
				await FileSystem.makeDirectoryAsync(
					`${FileSystem.documentDirectory}SQLite`
				);
			}
			const [{localUri, uri}] = await Asset.loadAsync(localDatabase);
			const result = await FileSystem.downloadAsync(
				uri,
				`${FileSystem.documentDirectory}SQLite/${dbName}`
			);

			console.log(localUri, uri);
			console.log(result, "result");
			const db = await openDatabaseAsync(`${dbName}`, { useNewConnection: true, enableChangeListener: true })
				.then(async db => await dropDatabaseTablesAsync(db))
				.then(async db => await setupTablesAsync(db));
			return db;
		} catch (error) {
			console.error("Error creating database", error);
		} finally {
			setDBLoading(false);
		}
	};

	return {createDB, isDBLoading};
}