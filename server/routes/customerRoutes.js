const express = require("express");
const auth = require("../middleware/auth");
const customerModal = require("../models/customerModal")

const router = express.Router()

router.post("/" , auth , async (req, res) => {


   try{

    // {
    //     "name": "ali"
    // }

    
     const {name} = req.body ;

    const newCustomer = new customerModal({
        name 
    })

    const savedCustomer = await  newCustomer.save();

    res.json(savedCustomer)

   }catch(err){
        console.error(err);
        res.status(500).send();
   }
})

router.get("/" , async (req , res) => {
  try{
    const customer = await customerModal.find()
    console.log(customer);
    res.json(customer)
  }catch(err){
        console.error(err);
        res.status(500).send();
   }
})

module.exports = router ;

