const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    mode: "development",
    watch: true,
    devtool: "inline-cheap-source-map",
    watchOptions: {
        ignored: ["node_modules/**"],
    },    
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ 
        name: options.output.filename,
        nodeArgs: ['--inspect=0.0.0.0:9229']
    }),
    ],
  };
};