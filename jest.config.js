module.exports = {
    preset: 'react-native',
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
        "\\.(ts|tsx)$": "ts-jest"
        /*"^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
        "\\.(ts|tsx)$": "ts-jest"*/
    },
    setupFiles: [
        "<rootDir>/app/jest-setup.tsx"
    ],
    moduleNameMapper: {
        "^app/(.*)$": "<rootDir>/app/$1",
        "^[./a-zA-Z0-9$_-]+\\.(jpg|jpeg|png|gif|webp|svg)$": "RelativeImageStub",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.tsx",
        "\\.(css|less)$": "identity-obj-proxy"
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    snapshotSerializers: [
        "enzyme-to-json/serializer"
    ],
    testRegex:
        "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$"
    ,
    testPathIgnorePatterns: [
        "\\.snap$",
        "<rootDir>/node_modules/"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!react-native|react-navigation)/"
    ],
    globals: {
        'ts-jest': {
            "tsConfig": "tsconfig.jest.json",
            diagnostics: false
        }
    },
    clearMocks: true,
    cacheDirectory: '.jest/cache',
    verbose: true
};