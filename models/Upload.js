let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Upload = Schema({
    fileName : String,
    s3Directory : String,
    status : String,
    description: String,
    createdDate : Date,
    modifiedDate : Date
});
module.exports = mongoose.model('Upload', Upload)