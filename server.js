// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");
// // const cors = require("cors");

// const dev = process.env.NODE_ENV !== "production";
// const hostname = dev ? "localhost" : "vampay.in";
// const port = dev ? 3000 : 443;

// const app = next({ dev });
// const handle = app.getRequestHandler();
// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       const parsedUrl = parse(req.url, true);
//       const { pathname, query } = parsedUrl;

//       if (pathname === "/a") {
//         await app.render(req, res, "/a", query);
//       } else if (pathname === "/b") {
//         await app.render(req, res, "/b", query);
//       } else {
//         await handle(req, res, parsedUrl);
//       }
//     } catch (err) {
//       console.error("Error occurred handling", req.url, err);
//       res.statusCode = 500;
//       res.end("Internal server error");
//     }
//   })
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, hostname, () => {
//       // console.log(`> Ready on http${dev ? "" : "s"}://${hostname}:${port}`);
//     });
// });

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

// console.log(dev, "isOnDev");

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    // console.log(parsedUrl, "parsedUrl");
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
