module.exports = {
  webpack: {
    configure: {
      optimization: {
        splitChunks: {
          cacheGroups: {
            'vendor-material-ui': {
              name: 'vendor-material-ui',
              test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
              chunks: 'initial',
              priority: 2,
            },
            'vendor-react': {
              name: 'vendor-sr-rcl',
              test: /[\\/]node_modules[\\/]@texttree\/scripture-resources-rcl[\\/]/,
              chunks: 'initial',
              priority: 3,
            },
            'vendor-all': {
              name: 'vendor-all',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              priority: 1,
            },
          },
          maxSize: 200000,
        },
        runtimeChunk: {
          name: 'manifest',
        },
      },
    },
  },
};
