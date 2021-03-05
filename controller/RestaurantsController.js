let db = require('../models');
let {mandatory, errormsg} = require('../config')
module.exports = {
    listRestaurants : async (req, res) => {
        try {
            let { pageSize, currentPage } = req.query;
            let {mapCenter} = req.body
            if(!mapCenter) return res.send(mandatory)
            let {lat , lng} = mapCenter;
            if(!lat || !lng) return res.send(mandatory)
            lat = parseFloat(lat);
            lng = parseFloat(lng);
            console.log(lat)
            let limit = parseInt(pageSize) || 10;
            let page = parseInt(currentPage) || 1;
            let skip = (page - 1) * limit
            let val = await db.Restaurant.find({
                "place.location" : {
                    $near: {
                        $maxDistance: 1000, //1 km
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        }
                    }
                }
            }).populate('photos.media').skip(skip).limit(limit);
            if (val.length == 0) return res.send({statusCode : 200, apiStatus: true,result : val, message : 'Data Not Found!'})
            return res.send({statusCode : 200, apiStatus: true,result : val, message : 'Data Found!'})
        } catch (error) {
            console.log(error);
            return res.send(errormsg)
        }
    },
}