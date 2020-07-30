module.exports = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	testTimeout: 15000,
}
