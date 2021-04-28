import path from 'path'
import { Side, Env } from 'react-torch'
import fetch from 'node-fetch'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { GenerateSW } from 'workbox-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import type {
  PackContext,
  TorchConfig,
  WebpackConfigTransform,
  IntegralTorchConfig,
} from 'react-torch'
import type { Configuration } from 'webpack'

const transformWebpackConfig: WebpackConfigTransform = (
  config,
  packContext,
  torchConfig
) => {
  if (packContext.env === 'production') {
    config.plugins?.push(new GenerateSW())
  }
  if (packContext.packSide === Side.Client) {
    config = getClientWebpackConfig(config, packContext)
  } else {
    config = getServerWebpackConfig(config)
  }

  if (config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@src': path.resolve(torchConfig.dir, 'src'),
    }
  } else {
    config.resolve = {
      alias: {
        '@src': path.resolve(torchConfig.dir, 'src'),
      },
    }
  }

  return config
}

const getPort = () => {
  if (process.env.NODE_ENV === 'production') {
    return 8080
  } else {
    return 3000
  }
}

const config: TorchConfig = {
  title: 'Ma Tianqi',
  src: './src/page',
  middleware: './src/middleware',
  document: './src/document',
  port: getPort(),
  transformWebpackConfig,
  installPolyfill: (config) => {
    polyfillNodeFetch(config)
  },
}

export default config

const getClientWebpackConfig = (
  config: Configuration,
  packContext: PackContext
): Configuration => {
  const isDev = packContext.env === Env.Development
  config.module?.rules?.push({
    test: /\.(le|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      'less-loader',
    ],
  })
  config.plugins?.push(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `css/${isDev ? '[name]' : '[name]-[contenthash:6].'}.css`,
      chunkFilename: `css/${isDev ? '[name]' : '[name]-[contenthash:6]'}.css`,
    }),
    // new BundleAnalyzerPlugin()
  )
  config.optimization!.splitChunks = {
    chunks: 'all',
    name: 'vendor',
    cacheGroups: {
      highlight: {
        name: 'highlight',
        test: (module) => {
          return /react-syntax-highlighter|refractor|highlight/.test(
            // @ts-ignore
            module.context
          )
        },
        chunks: 'all',
        priority: 10,
      },
      vendors: {
        name: `vendor`,
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial',
      },
      index: {
        name: 'index',
        priority: 5,
        chunks: 'initial',
      },
    },
  }
  return config
}

const getServerWebpackConfig = (config: Configuration): Configuration => {
  config.module?.rules?.push({
    test: /\.(le|sc|c)ss$/,
    use: ['null-loader'],
  })
  return config
}

const polyfillNodeFetch = (config: IntegralTorchConfig) => {
  global.fetch = ((input: string, init?: RequestInit | undefined) => {
    if (input.startsWith('//')) {
      input = 'http:' + input
    }
    if (input.startsWith('/')) {
      input = `http://localhost:${config.port}${input}`
    }
    return fetch(input, init as any) as any
  }) as any
}
