const path = require('path')
const { build } = require('esbuild')

const makeAllPackagesExternalPlugin = {
  name: 'make-all-packages-external',
  setup(build) {
    let filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, (args) => ({ path: args.path, external: true }))
  },
}

build({
  entryPoints: [path.resolve(__dirname, '../serve.ts')],
  outfile: path.resolve(__dirname, '../serve.js'),
  bundle: true,
  platform: 'node',
  target: ['node14.16'],
  plugins: [makeAllPackagesExternalPlugin],
})
