import React, { useEffect } from "react";

import { database } from "@s/db/sqlite";

export default function useDatabase() {
	const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

	useEffect(() => {
		async function loadDataAsync() {
			try {
				console.log("starting dropDatabaseTablesAsync");
				await database.dropDatabaseTablesAsync();
				console.log("finished dropDatabaseTablesAsync");

				console.log("starting setupDatabaseAsync");
				await database.setupTablesAsync();
				console.log("finished setupDatabaseAsync");

				setDBLoadingComplete(true);
			} catch (e) {
				console.warn(
					"Issue setting dropping or setting up the database."
				);
				console.warn(e);
			}
		}

		loadDataAsync();
	}, []);

	return isDBLoadingComplete;
}
