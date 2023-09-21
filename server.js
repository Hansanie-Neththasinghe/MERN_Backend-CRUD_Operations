const express = require('express');
const bodyParser = require('body-parser');

//can remove above line because latest express version is capable of doing that task
//app.use(express.json());
//if we did not remove bodyparser, we should add below line
//app.use(bodyparser.json());

const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
   // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
   // useFindAndModify: false
}
);
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully.");
});

// Create a variabe to access the patient_routes.js
//import the patient_routes.js file to this
//http://localhost:5000/patient

const patientRouter = require("./routes/patient_routes.js");
app.use("/patient",patientRouter);

app.listen(PORT, () =>{
    console.log(`Server is running on port : ${PORT}`);
});