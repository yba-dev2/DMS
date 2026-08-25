require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');
const compression = require("compression");
const morgan = require("morgan");
const previewMode = process.env.UI_PREVIEW === "true";

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(morgan("dev"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use('/pdfjs', express.static(path.join(__dirname, 'node_modules/pdfjs-dist/build')));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const startServer = () => {
  const port = process.env.PORT || 3030;
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
};

if (previewMode) {
  require("./routes/preview")(app);
  console.log("👀 UI preview mode enabled; database, email, and FTP features are disabled.");
  startServer();
} else {
  require("./routes/web")(app);
  const { sequelize } = require("./config/dbConnector");

  // Connect to DB, then start server
  sequelize.authenticate()
    .then(() => {
      console.log("✅ MSSQL connected using Sequelize");
      return sequelize.sync(); // Sync models with DB
    })
    .then(startServer)
    .catch((err) => {
      console.error("❌ Could not start server due to DB connection error:", err);
    });
}
