const {defineConfig} = require("cypress");

module.exports = defineConfig({
  projectId: 'g8ah8f',
    pageLoadTimeout: 15000,

    env: {
        firstCookieValue: "firstValue",
    },

    e2e: {
        setupNodeEvents(on, config) {
            return config;
        }
    },
});
