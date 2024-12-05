const browserSync = require("browser-sync");
const { spawn } = require("child_process");

let nodemon;

// Start Browsersync and proxy the Express app
browserSync.init({
  proxy: "http://localhost:3000", // Your Express server
  files: ["app.js", "views/**/*.*", "public/**/*.*"], // Watch these files for changes
  port: 4000, // Browsersync runs on a different port
  open: false, // true: Automatically open the browser
  reloadDelay: 500, // Delay reload slightly to ensure changes are applied
});

// Use Nodemon to restart the server on changes
nodemon = spawn("nodemon", [], { stdio: "inherit" });

nodemon.on("close", () => {
  console.log("Nodemon has exited");
  browserSync.exit(); // Exit Browsersync when Nodemon exits
});

process.on("exit", () => {
  if (nodemon) nodemon.kill();
});