module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.tsx'],
  coverageDirectory: 'coverage',
  preset: 'jest-expo',
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  setupFiles: [
    '<rootDir>/jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
  ],
  testPathIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
    '/android',
    '/ios',
  ],
};
