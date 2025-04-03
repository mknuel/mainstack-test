export default {
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1", // Adjust based on your alias setup
	},
	transform: {
		"^.+\\.(ts|tsx)$": "@swc/jest",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
