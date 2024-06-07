/*
 * src/components/behavioral-components/GymList.tsx 
 * Working component name; I probably want to be more specific.
 */

import useGyms from "@/src/hooks/db/useGyms";
import React from "react";
import { View, ScrollView } from "react-native";
import { DefaultText } from "../basic-components/TextStyles";


/*
 * I just had a revelation that extracting this into a fragment is kind of annoying because
 * it'll keep updating every time the parameter changes, which is **A LOT** because currentGym
 * is tied to a text updating function in modal.tsx.
 */
export default function GymListFragment(currentGym) {
	const [pastGyms] = useGyms();
	
	function GymSearchResults() {
		const gymList = pastGyms.filter(gymName => {
			gymName.includes(currentGym);
		});
		
		return gymList.map((gymName, idx) => (
			<DefaultText key={`gymlist-item-${idx}`}>{gymName}</DefaultText>
		) );
	}
	
	
	return (
		<>
			<View>
				<DefaultText>Or choose a gym from the list:</DefaultText>
				<ScrollView>
					<GymSearchResults />
				</ScrollView>
			</View>
		</>
	);
}

 