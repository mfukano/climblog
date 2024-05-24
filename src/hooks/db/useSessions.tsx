import { getSessions } from "@/src/db/sqlite";
import { SessionDB } from "@/src/model/session";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

function useSessions() {
	const db = useSQLiteContext();
	

	console.log(`useSessions invoked at ${new Date()}`);
	const query = useQuery({
		queryKey: ["sessions"],
		queryFn: (): Promise<SessionDB[]> => getSessions(db),
	});
	console.log(`useSessions query: ${JSON.stringify(query)}`);
	return query;
}

export default useSessions;