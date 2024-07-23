/**
 *	DateHelper is intended to do formatting for session date listings.
 *	When a session is recorded, it can have one of three formats:
 * 	- (Earlier) Today
 *	- Yesterday
 * 	- Explicit date 
 * 	I think it would LOOK NICE if the explicit date also had the day of the week,
 *  so using something like Dayjs is probably something I'd want, at least for this case.	
 */
import dayjs from "dayjs";

export function formatDate(date: string) {
	let dateString = "";
	let weekDay = "";
	const dayDiff = dayjs(new Date()).diff(dayjs(date), "d");
	console.log(`
		dayDiff: ${dayDiff}
		date passed in: ${date}		
	`);
	switch(dayDiff) {
	case 0:
		dateString = "Earlier Today";
		break;
	case 1:
		dateString = "Yesterday";
		break;
	default:
		dateString = date.slice(0, date.lastIndexOf(" "));	
		weekDay = dateString.slice(0, dateString.indexOf(" "));
		dateString = `${weekDay}, ${dateString.slice(dateString.indexOf(" ")+1, dateString.lastIndexOf(" "))}`;
		break;
	}

	return dateString;
}