const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({

    title: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    }


});

module.exports = { Category: mongoose.model('category', CategorySchema) };