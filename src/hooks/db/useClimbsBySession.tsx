import { getClimbsBySessionId } from "@/src/db/sqlite";
import { ClimbDB } from "@/src/model/climb";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

function useClimbsBySession(sessionId: number) {
	const db = useSQLiteContext();

	const query = useQuery({
		queryKey: ["climbs", sessionId],
		queryFn: (): Promise<ClimbDB[]> =>
			getClimbsBySessionId(db, sessionId)
	});

	if (query.error != null) {
		const errMsg = `There was an error getting climbs by session id: ${query.error}`;
		throw new Error(errMsg);
	} else {
		console.log(`printing query result:
			${JSON.stringify(query!)}
		`);
	}

	return query;
}

export default useClimbsBySession;