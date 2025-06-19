const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    level:String,
    createdAt : {type: Date, default: Date.now},

}, {collection: 'students'});

module.exports = mongoose.model('Student', studentSchema);


