export default function toggleArrayElement (array, element) {
	return array.includes(element)
		? array.filter(item => item !== element) || []
		: array.concat([element]).sort();
}