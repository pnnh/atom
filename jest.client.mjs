/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    roots: ['<rootDir>'],
    clearMocks: true,
    coverageDirectory: "coverage",
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    testMatch: ["**/common/**/*.test.[jt]s?(x)", "**/client/**/*.test.[jt]s?(x)"],
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
}


