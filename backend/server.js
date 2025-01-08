const express = require('express');
const dotenv = require('dotenv').config();
const cors = require("cors");
const connectDB = require('./database/database');
const taskRouter = require("./routes/taskRoute");


const app = express();
connectDB();
app.use(express.json()); // Parses incoming JSON payloads
app.use(cors());
app.use("/api", taskRouter);

app.get('/',(req, res)=> {
    res.send('<h1>Hello , express server!</h1>');
});

const port = process.env.PORT;
app.listen(port, ()=> console.log(`server running on http://localhost:${port}`))
       