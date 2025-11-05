// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;

config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs", "mjs"];

module.exports = withNativeWind(config, {
  input: "./global.css",
});
