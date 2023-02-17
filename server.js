const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// import items from '../routes/api/items.js';
const items = require('./routes/api/items.js');
const app = express();

app.use(cors());
app.use(morgan('dev'));
//Bodyparser Middleware
app.use(bodyParser.json());

// Db config
const db = require('./config/keys').mongoURI;

//Connect to mongodb
mongoose.set('strictQuery', false);
mongoose
    .connect(db)
    .then(() => console.log('Mongodb connected...'))
    .catch(err => console.log(err));



// Use api routes    
app.use('/api/items',items);

app.get("/di", async (req, res) => {
    res.json("Hello from Agamir-IT");
})
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
