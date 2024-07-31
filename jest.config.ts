import type {Config} from "jest";

const config: Config = { 
	preset: "jest-expo",
	verbose: true,
	setupFilesAfterEnv: ["./jest-setup.ts"],
	testEnvironment: "jsdom",
};

export default config;