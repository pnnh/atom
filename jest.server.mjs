/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    clearMocks: true,
    coverageDirectory: "coverage",
    preset: 'ts-jest',
    testEnvironment: "node",
    testMatch: ["**/common/**/*.test.[jt]s?(x)", "**/server/**/*.test.[jt]s?(x)"],
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
}


