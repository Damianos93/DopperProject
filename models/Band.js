const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const bandSchema = new Schema({
    bandName: {
        type: String,
        required: true,

    },
    genres: [{
        type: String,
    }],
    info:String,
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
})

const Band = mongoose.model("Band",bandSchema)
module.exports = Band;