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

	console.log(query.error, "Error");

	return query;
}

export default useClimbsBySession;