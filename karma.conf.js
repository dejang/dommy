module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
            { pattern: 'test/**/*.test.js' },
        ],
        exclude: [],
        preprocessors: {
            'test/**/*.test.js': ['rollup'],
        },
        rollupPreprocessor: {
            options: {
                output: {
                    format: 'iife', // Helps prevent naming collisions.
                    name: 'dommy', // Required for 'iife' format.
                    sourcemap: 'inline' // Sensible for testing.
                }
            },
            // ["debug", "info"], log level for watch description
            logWatch: 'info',
            // File test/**/*.spec.js will be deployed on Karma with path test/**/*.test.js
            transformPath: filePath => filePath.replace('.test.js', '.test.js')
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--remote-debugging-port=9222',
                ],
            },
        },
    });
};