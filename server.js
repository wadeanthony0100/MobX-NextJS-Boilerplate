const env = process.env.NODE_ENV || 'dev';
const port = process.env.NODE_PORT || 3000;

const dev = env == 'dev'
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const mobxReact = require('mobx-react');
const app = next({ dev });
const handle = app.getRequestHandler();

mobxReact.useStaticRendering(true);

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    })
      .listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`);
      });
  });
