const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

app.get('/', (req, res) => res.send('Hello world'));

const PORT = process.env.PORT;
// const route = require("./routes/index");

//connect db
const db = require("./app/config/db/index");
db.connect();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/user',userRoute);
app.listen(5000, () => console.log(`Server stated on port ${5000}`));
