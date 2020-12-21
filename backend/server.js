const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
).catch(error => handleError(error));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    const queriesRouter = require('./routes/queries');
    const answersRouter = require('./routes/answers');

    app.use('/queries', queriesRouter);
    app.use('/answers', answersRouter);
    console.log(`Server is running on port: ${port}`);
});

function handleError(e) {
    console.log(e);
}
