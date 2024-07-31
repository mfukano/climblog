import { clearGymList, getGymList } from "@/src/helpers/gymAsyncStorage";
import { Dispatch, SetStateAction, useState } from "react";

const useGyms = () => {
	const [gyms, setGyms]: [string[], Dispatch<SetStateAction<string[]>>] = useState([]);
	(async () => {
		console.log("invoking useGyms");
		await clearGymList();
		return await getGymList().then(gyms => {
			setGyms(gyms);
		});
	})();
	return [gyms] as const;
};

export default useGyms;