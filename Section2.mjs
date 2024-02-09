// show dbs

// TO CREATE DATABASE
// use flights

db.flightData.insertOne({_id: "txl-hr-1"}) // custom id

db.flightData.find().pretty()

db.flightData.deleteOne({key: value})

db.flightData.updateOne({distance: 12000}, {$set: {marker: "delete"}})

db.flightData.updateMany({}, {$set: {marker: "toDelete"}})

db.flightData.deleteMany({marker: "toDelete"}) // To delete all





 db.flights.updateOne({_id: ObjectId("65b76b3dd98d7119d3d9e2f7")}, {$set: {delayed: true}})


db.flights.find().toArray()

db.passengers.find().forEach((passengerData) => { printjson(passengerData) })

db.passengers.findOne()

db.passengers.findOne().pretty() // error coz pretty() is for multiple docs

db.passengers.find({}, {name: 1}).pretty()  // Here, it will default display _id 

db.passengers.find({}, {name: 1, _id: 0}).pretty()

db.flights.updateMany({}, {$set: {status: {description: "on-time", lastUpdated: "1 hour ago"}}})

db.flights.updateMany({}, { $set: { status: { description: "on-time", lastUpdated: "1 hour ago", details: { responsible: "Colt Steele" } } } })

// array in a document
 db.passengers.updateOne({name: "Gordon Black"}, {$set: {hobbies: ["sports", "cooking", "art"]}})

// projection
db.passengers.findOne({name: 'Gordon Black'}).hobbies

 db.passengers.find({hobbies: "sports"}).pretty()

// Get Embedded Docs with dot notation 
db.flights.find({"status.description": "on-time"}).pretty()

 db.flights.find({"status.details.responsible": "Colt Steele"}).pretty()


