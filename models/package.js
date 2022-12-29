const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number },
    description: { type: String },
    image:{ type:String() }
});


mongoose.model('Package', PackageSchema);
