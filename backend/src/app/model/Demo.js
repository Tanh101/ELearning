const mongoose = require('mongoose');
const SChema = mongoose.Schema;

const DemoSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    status: {
        type: String
    }
})
module.exports = mongoose.model('demo', DemoSchema);