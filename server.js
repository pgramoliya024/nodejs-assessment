const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const userRoute = require('./routes/userRoutes');
const blogRoute = require('./routes/blogsRouter')

dotenv.config();
mongoose.connect(
    process.env.CONNECTION_STRING,
    {useNewUrlParser: true ,useUnifiedTopology: true }
)

const db = mongoose.connection;
db.on('error', console.error.bind(console , "database connection error"));


const app = express();
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))


app.use(userRoute);
app.use(blogRoute)


app.use('/', (req, res) => {
    res.send("<h1>Hello from server</h1>")
})


app.listen(8080, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Server is running on 8080....");
    }
})