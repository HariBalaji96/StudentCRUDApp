const express = require("express");
const cors = require("cors");

require("./db"); // DB init

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, ()=> console.log("Server running"));
