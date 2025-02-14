module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
      "/node_modules/"
    ],
    globals: {
      "babel-jest": {
        "presets": ["@babel/preset-env", "@babel/preset-react"]
      }
    }
  };
  