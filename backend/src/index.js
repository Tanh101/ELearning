const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello world'));

const PORT = process.env.PORT;
const route = require("./routes/index");

//connect db
const db = require("./app/config/db/index");
db.connect();


app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));
