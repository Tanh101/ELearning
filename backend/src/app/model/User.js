const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role : {
        type: String,
        default: "guest"
    },
    deletedAt: {
        type: Date
    }
}, {timestamps: true})

module.exports = mongoose.model('users', UserSchema);