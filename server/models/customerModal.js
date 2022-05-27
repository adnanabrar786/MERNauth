const mongoose = require("mongoose")


const customerSchrma = new mongoose.Schema({
      name : {type : String , require : true}
  });

  const Customer = mongoose.model('customer', customerSchrma);

  module.exports = Customer

