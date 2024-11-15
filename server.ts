import app from "./src/app";
import config from "./src/configs/mongodb.config";
const PORT = config.app.port || 3000;
app.set("port", PORT);
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Stopping server");
  server.close(() => {
    console.log("Server stopped");
    process.exit(0);
  });
});
