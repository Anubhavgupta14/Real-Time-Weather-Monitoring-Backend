const WeatherSummary = require("../models/WeatherSummary");
const {convertDate} = require("../utils/helpers")
const moment = require("moment-timezone");

exports.getData = async(req, res)=>{
    try{
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }
        const {city} = req.body;
        // console.log(city)
        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }
        //here I want to fetch today's data so will use today date.
        const today = moment().tz("Asia/Kolkata").startOf("day").toDate();
        const data = await WeatherSummary.findOne({city, date:today});

        // console.log(data,"data");
        return res.status(200).json({data:data})
    }
    catch(err){
        console.log(`Error while fetching data: ${err}`)
    }
}

exports.getOldData = async(req, res)=>{
    try{
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }
        const {city, date} = req.body;

        if (!city || !date) {
            return res.status(400).json({ error: "City & Date is required" });
        }
        //here I want to fetch old data.
        const data = await WeatherSummary.findOne({city, date: convertDate(date)});

        // console.log(data,"data");
        return res.status(200).json({data:data})
    }
    catch(err){
        console.log(`Error while fetching data: ${err}`)
    }
}