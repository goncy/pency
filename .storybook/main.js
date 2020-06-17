const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpackFinal: async config => {
    // Add additional paths plugin to fix custom paths error
    // https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      })
    ];
    return config
  },
  addons: [{
    name: '@storybook/preset-typescript',
    options: {
      forkTsCheckerWebpackPluginOptions: {
        tsconfig: path.resolve(__dirname, '../tsconfig.json')
      },
    }
  },
    '@storybook/addon-actions',
    '@storybook/addon-a11y/register',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register'
  ],
};
