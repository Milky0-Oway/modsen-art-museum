import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
		'\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
	coverageThreshold: {
		global: {
			branches: 40,
			functions: 40,
			lines: 40,
			statements: 40,
		},
	},
	coveragePathIgnorePatterns: ['/node_modules/'],
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^components/(.*)$': '<rootDir>/src/components/$1',
		'^utils/(.*)$': '<rootDir>/src/utils/$1',
		'^assets/(.*)$': '<rootDir>/src/assets/$1',
		'^pages/(.*)$': '<rootDir>/src/pages/$1',
		'^context/(.*)$': '<rootDir>/src/context/$1',
		'^constants/(.*)$': '<rootDir>/src/constants/$1',
		'\\.(css|less|scss)$': 'identity-obj-proxy',
	},
};

export default config;
