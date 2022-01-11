/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { Configuration } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

type Env = {
  production: boolean;
};

const serverConfiguration = (
  env: Env
): Configuration & Record<string, unknown> => ({
  mode: env.production ? 'production' : 'development',
  entry: './src/server/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server-[fullhash].js'
  },
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()] as Configuration['externals'],
  devtool: env.production ? 'hidden-source-map' : 'eval-cheap-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
});

export default serverConfiguration;
