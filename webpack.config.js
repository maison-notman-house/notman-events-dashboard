module.exports = {
  context: __dirname + '/src',
  entry: './events.js',
  output: {
    path: __dirname + '/build',
    filename: 'events.bundle.js'
  },
 module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel", query: {
        presets: ['react', 'es2015']
      }
    }
  ]
}
};