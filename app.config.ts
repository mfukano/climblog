import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	slug: "climblog",
	name: "Climblog",
	plugins: [
		"expo-router"
	]
});