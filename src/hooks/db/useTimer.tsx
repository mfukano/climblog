import { useState, useEffect } from "react";

/**
 * I imagine this as a way to manage the data associated with the current running session.
 * We can use this in order to update duration and provide a timer instance that begins from the
 * session created.
 * 
 * This should first get the session by id passed to the page. 
 * Then, we can initialize a timer based on the session creation date.
 * When the session ends and the running state resolves to false, we can log the duration, write ended to session ongoing db flag, and redirect.
 */

const useTimer = () => {
	const [ongoing, setOngoing] = useState(false);
	const [displayTime, setDisplayTime] = useState("");
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		// log duration
		
	}, [ongoing]);

	useEffect(() => {
		const hours = Math.floor(duration / 3600);
		const minutes = Math.floor((duration % 3600) / 60);
		const seconds = Math.floor(duration % 60);
		setDisplayTime(`${
			hours < 10 ? `0${hours}` : hours
		}:${
			minutes < 10 ? `0${minutes}` : minutes
		}:${
			seconds < 10 ? `0${seconds}` : seconds
		}`);

	}, [duration]);

	useEffect(() => {
		const interval = setInterval(() => {
			setDuration((prevTime) => prevTime + 1);
		}, 1000);

		if (!ongoing) {
			clearInterval(interval);
			console.log(`useActiveSession timer ending.
			duration: ${duration}
			displayTime: ${displayTime}
			`);
		}

		return () => clearInterval(interval);
	}, [ongoing]);

	const clearTime = () => {
		setDuration(0);
	};
	
	return {displayTime, setOngoing, clearTime};
};

export default useTimer;