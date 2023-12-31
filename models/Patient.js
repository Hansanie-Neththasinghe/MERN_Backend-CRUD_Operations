const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    identity : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    //country : {
       // type : String,
       // required : true
   // },
    
    email : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },
})

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient;