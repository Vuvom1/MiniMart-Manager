const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
    backgroundColor: {
        type: String,
        required: false,
    },
    textColor: {
        type: String,
        required: false,
    }
   
});

const Style = mongoose.model('Style', styleSchema);

module.exports = Style;
