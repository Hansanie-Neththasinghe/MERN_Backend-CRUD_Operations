//PATIENT PROFILE RELATED CRUD OPERATIONS
const router = require("express").Router();
const { request } = require("express");

let Patient = require("../models/Patient");

//=====================================================
//CREATE A PATIENT BEFORE MAKE A CHANNELLING

router.route("/add").post((req,res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const identity = req.body.identity;
    const gender = req.body.gender;
    const email = req.body.email;
    const address = req.body.address;
   

    const newPatient = new Patient({
        firstName,
        lastName,
        phone,
        identity,
        gender,
        email,
        address
    })

    newPatient.save().then(()=>{
        res.json("Patient added")
    }).catch((err) => {
        console.log(err);
    })
})

//=====================================================
// READ data from database
router.route("/").get((req,res)=>{
    Patient.find().then((patients)=>{
        res.json(patients)
    }).catch((err)=>{
        console.log(err)
    })
})
//=====================================================
//UPDATE
router.route("/update/:id").put(async(req,res)=>{
    let patientId = request.params.id;

    const{firstName,lastName,phone,identity,gender,email,address} = req.body;

    //crate an object
    const updatePatient = {
        firstName,
        lastName,
        phone,
        identity,
        gender,
        email,
        address
    }
    const update = await Patient.findByIdAndUpdate(userId, updatePatient)
    .then(()=>{
        res.status(200).send({status:"Patient details updated successfully"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating details", error:err.message});
    })
})

//=====================================================
//DELETE
router.route("deletepatient/:id").delete(async(req,res)=>{
    let patientId = request.params.id;

    await Patient.findByIdAndDelete(patientId).then(()=>{
        res.status(200).send({status: "Patient deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error eith deleton", err: err.message});
    })
})

//=====================================================
//Select only one patient
router.route("/get/:id").get(async (req,res) =>{
    let patientId = req.paramsms.id;
    const patient = await Patient.findById(patientId)
    .then((patient)=>{
        res.status(200).send({status: "Patient found",patient})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting patient", error: err.message});
    })
})


module.exports = router;
