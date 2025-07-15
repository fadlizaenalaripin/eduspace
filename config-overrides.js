// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "zlib": require.resolve("browserify-zlib"),
        "util": require.resolve("util/"),
        "buffer": require.resolve("buffer/") // <-- PASTIKAN BARIS INI ADA DAN BENAR
    });
    config.resolve.fallback = fallback;

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser', // <-- PASTIKAN INI ADA
            Buffer: ['buffer', 'Buffer'], // <-- PASTIKAN INI ADA
        }),
    ]);

    // Ini untuk mengatasi "BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules"
    // dan juga error "Cannot read properties of undefined (reading 'module')"
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false // Ini penting untuk CRA dengan Webpack 5 dan CJS/ESM interop
        }
    });

    return config;
}