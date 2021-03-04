let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Restaurant = Schema({
    place : {
        location : {
            type: {type : String},
            coordinates: []
        },
        vicinity: String
    },
    kewords: [
        {
            data : {
                type : String
            }
        }
    ],
    title : String,
    slug : String,
    email : String,
    website : String,
    status : String,
    restaurantType : String,
    photos : [{
        category : String,
        media : {
            type : Schema.Types.ObjectId,
            ref : 'Upload'
        },
        viewOrder: Number
    }]

});
Restaurant.index({ place: {location: "2dsphere"} });
module.exports = mongoose.model('Restaurant', Restaurant)