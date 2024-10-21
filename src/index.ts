import { readFile } from "fs/promises";
import http, { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { fileURLToPath } from "url";

const host = "0.0.0.0";
const port = 8080;

const httpServer = http.createServer(httpHandler);

httpServer.listen(port, host, () => {
  console.log(`HTTP server running at http://${host}:${port}/`);
});

async function httpHandler(req: IncomingMessage, res: ServerResponse) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const publicFile = path.join(__dirname, "../public", req.url || "");

  try {
    const data = await readFile(publicFile);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
  } catch (err) {
    console.error(err);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
  } finally {
    res.end();
  }
}
