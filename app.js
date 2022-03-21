const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./models");
db.sequelize.sync();

app.use(cors(corsOptions));
app.use(express.json());
//React JS
app.use(express.static(path.join(__dirname, "./client/build")));

app.use(express.urlencoded({ extended: true }));

app.set("api_secret_key", require("./config/config.json").api_secret_key);

require("./app/routes/users.routes")(app);
require("./app/routes/auth.routes")(app);
//React JS
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html")
  );
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});