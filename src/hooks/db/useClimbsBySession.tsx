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
		console.log(`check query status: ${query.status}`);
	} else {
		console.log(`printing query result:
			${JSON.stringify(query!)}
		`);
	}

	console.log(`check query.data: ${JSON.stringify(query.data)}`);

	return query;
}

export default useClimbsBySession;