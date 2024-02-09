// INCREMENTING & DECREMENTING VALUES
db.users.updateOne({ name: "Anna" }, { $inc: { age: 2 } });
db.users.updateOne({ name: "Anna" }, { $inc: { age: -1 } });
 db.users.updateOne(
   { name: "Anna" },
   { $inc: { age: -1 }, $set: { isSporty: false } }
 );


 // MongoServerError: Updating the path 'age' would create a conflict at 'age'
db.users.updateOne({name: 'Anna'}, {$inc: {age: 1}, $set: {age: 30}})

// old value should be higher than new value
db.users.updateOne({ name: "Anna" }, { $min: { age: 30 } });

// old value should be lower than new value
db.users.updateOne({ name: "Anna" }, { $max: { age: 38 } });

db.users.updateOne({ name: "Anna" }, { $mul: { age: 1.1 } });

db.users.updateMany({isSporty: true}, {$set: {phone: null}})
db.users.updateMany({isSporty: true}, {$unset: {phone: ""}})

// RENAMING FIELDS
db.users.updateMany({}, {$rename: {age: "totalAge"}})

// UPSERT
db.users.updateOne({name: 'Maria'}, {$set: {age: 30, hobbies: [{title: "Good Food", frequency: 3}], isSporty: true}}, {upsert: true})


// UPDATING MATCHED ARRAYS

db.users.updateMany({hobbies: {$elemMatch: {title: "sports", frequency: {$gte: 3}}}}, {$set: {"hobbies.$.highFrequency": true}})


// UPDATING ALL ARRAY ELEMENTS

 db.users.updateMany(
   { "hobbies.frequency": { $gt: 2 } },
   { $set: { "hobbies.$.goodFrequency": true } }
 );

// Dollar($) Sign gives the first matching element
//  Error : cannot create a new field in an array & here hobbies is array & not a document
db.users.updateMany({totalAge: {$gte: 20}}, {$inc: {"hobbies.frequency": -1}})

db.users.updateMany(
  { totalAge: { $gte: 20 } },
  { $inc: { "hobbies.$[].frequency": -1 } }
);


// FINDING & UPDATING SPECIFIC FIELDS
// "hobbies.frequency": This filter by which u identify documents & the filter by which u identify elements in array which u want to update do not be equal 
db.users.updateMany({"hobbies.frequency": {$gt: 2}}, {$set: {"hobbies.$[el].goodFrequency": true}}, {arrayFilters: [{"el.frequency": {$gt: 2}}]})

// ADDING ELEMENTS TO ARRAYS
db.users.updateOne({name: "Maria"}, {$push: {hobbies: {title: "sports", frequency: 2}}})

db.users.updateOne({name: 'Maria'}, {$push: {hobbies: {$each: [{title: 'Good Wine2', frequency: 1}, {title: 'Hiking2', frequency: 2}], $sort: {frequency: -1}, $slice: 1}}})


// REMOVING ELEMENTS FROM ARRAY

db.users.updateOne({name: 'Maria'}, {$pull: {hobbies: {title: 'Hiking'}}})

db.users.updateOne({name: 'Chris'}, {$pop: {hobbies: 1}})
db.users.updateOne({ name: "Chris" }, { $pop: { hobbies: -1 } });

// In push, we can add duplicate elements but with $addToSet it is not allowed
db.users.updateOne({name: 'Maria'}, {$addToSet: {hobbies: {title: 'Hiking', frequency: 2}}})

// DELETE OPERATIONS

db.users.deleteOne({name: 'Maria'})
db.users.deleteMany({age: {$gt: 30}, isSporty: true})
db.users.deleteMany({totalAge: {$exists: false}, isSporty: true})

db.users.deleteMany({}) // Delete records but not table
db.users.drop() // Delete records & table both 
db.dropDatabase()