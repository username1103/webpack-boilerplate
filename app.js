const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.dev.js');
const compiler = webpack(webpackConfig);
const express = require('express');
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  })
);

app.get('/', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) return next(err);

    res.set('content-type', 'text/html').send(result);
  });
});

app.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});
