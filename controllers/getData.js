const WeatherSummary = require("../models/WeatherSummary");
const {convertDate} = require("../utils/helpers")
const moment = require("moment-timezone");

exports.getData = async(req, res)=>{
    try{
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }
        const threshold = 35
        const {city} = req.body;
        // console.log(city)
        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }
        //here I want to fetch today's data so will use today date.
        const today = moment().tz("Asia/Kolkata").startOf("day").toDate();
        const data = await WeatherSummary.findOne({city, date:today});
        if(data.temp > threshold){
            return res.status(200).json({data:data, alert:true})
        }
        // console.log(data,"data");
        return res.status(200).json({data:data, alert:false})
    }
    catch(err){
        return res.status(400).json({error:`Error while fetching data: ${err}`})
    }
}

exports.getOldData = async(req, res)=>{
    try{
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }
        const threshold = 35
        const {city, date} = req.body;

        if (!city || !date) {
            return res.status(400).json({ error: "City & Date is required" });
        }
        //here I want to fetch old data.
        const data = await WeatherSummary.findOne({city, date: date});
        if(data.temp > threshold){
            return res.status(200).json({data:data, alert:true})
        }
        // console.log(data,"data");
        return res.status(200).json({data:data, alert:false})
    }
    catch(err){
        return res.status(400).json({error:`Error while fetching data: ${err}`})
    }
}