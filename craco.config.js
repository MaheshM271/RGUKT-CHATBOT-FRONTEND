
const CracoAlias = require('craco-alias');
const path = require('path');
const allowedFilesToInclude = [path.join(__dirname, './node_modules/react-refresh/runtime.js')];

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          const moduleScopePlugin = webpackConfig.resolve.plugins.find(
            (plugin) => plugin.allowedFiles,
          );
          if (moduleScopePlugin) {
            allowedFilesToInclude.forEach((allowedFile) =>
              moduleScopePlugin.allowedFiles.add(allowedFile),
            );
          }
          return webpackConfig;
        },
      },
    },
    {
    plugin: CracoAlias,
    options: {
      source: "tsconfig",
      tsConfigPath: './paths.json',
    },
  },]
}