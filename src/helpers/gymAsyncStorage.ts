import AsyncStorage from "@react-native-async-storage/async-storage";

const insertGym = async (gym: string, gyms: string[]) => {
	try {
		if (!gyms || !gyms.includes(gym)) {
			const gymsToWrite = JSON.stringify([...gyms, gym]);
			await AsyncStorage.setItem("gyms", gymsToWrite);
		}
	} catch (e) {
		console.log("Either gym was already included in the list of gyms, or something went wrong.");
		console.warn(e);
	}
};
	
const getGymList = async () => {
	try {
		const gymList = await AsyncStorage.getItem("gyms");
		if (gymList !== null) {
			return JSON.parse(gymList);
		}
	} catch (e) {
		console.error("No gym names available");
	}
};

const clearGymList = async () => {
	try {
		await AsyncStorage.removeItem("gyms");

		const gymList = await AsyncStorage.getItem("gyms");
		console.log(`{clearGymList} Test to ensure gym list is null : ${gymList == null}`);
	} catch (e) {
		console.error("Something went wrong with clearGymList: ", e);
	}
};

export {
	clearGymList,
	insertGym,
	getGymList
};