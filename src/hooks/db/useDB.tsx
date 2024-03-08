import React, { useEffect } from "react";

import { database } from "../../db/sqlite";

import { climbsStore } from "../../store/climbStore";

export default function useDatabase() {
    const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

    useEffect(() => {
        async function loadDataAsync() {
            try {
                console.log("starting dropDatabaseTablesAsync")
                await database.dropDatabaseTablesAsync();
                console.log("finished dropDatabaseTablesAsync");

                console.log("starting setupDatabaseAsync"); 
                await database.setupDatabaseAsync();
                console.log("finished setupDatabaseAsync");

                console.log("starting setupClimbsAsync"); 
                await database.setupClimbsAsync();
                console.log("finished setupClimbsAsync");

                console.log("starting setupSessionsAsync"); 
                await database.setupSessionsAsync();
                console.log("finished setupSessionsAsync");

                const climbs = database.getClimbs();
                console.log(`climbs in useDatabase:`)
                console.log(climbs)

                setDBLoadingComplete(true);
            } catch (e) {
                console.warn("Issue setting dropping or setting up the database.")
                console.warn(e);
            }
        }

        loadDataAsync();
    }, []);

    return isDBLoadingComplete;
}