import { clearGymList, getGymList } from "@/src/helpers/gymAsyncStorage";
import { useState } from "react";

const useGyms = () => {
	const [gyms, setGyms] = useState([]);
	(async () => {
		await clearGymList();
		return await getGymList().then(gyms => {
			setGyms(gyms);
		});
	})();
	return [gyms] as const;
};

export default useGyms;