const mongoose = require('mongoose');
const user = require('./user');
const Schema = mongoose.Schema;


const noteSchema = new Schema(
    {
        title : { type : String, required : true},
        description : { type : String, required : true},
        user : {type: Object, required: true}
    }
);

module.exports = mongoose.model('Note', noteSchema);




