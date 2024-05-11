const express = require("express");
const app = express();
const routes = require("./routesv1");

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
