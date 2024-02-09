// WORKING WITH INDEXES
// ADDING A SINGLE FIELD INDEX
// INDEX RESTRICTIONS
db.contacts.explain("executionStats").find({"dob.age": {$gt: 60}})  // Execution time: 5ms

db.contacts.createIndex({"dob.age": 1})  // ASC
db.contacts.createIndex({"dob.age": -1})  // DESC

db.contacts.explain("executionStats").find({"dob.age": {$gt: 60}})  // Execution time: 3ms

db.contacts.dropIndex({"dob.age": 1})


// CREATING COMPOUND INDEXES
 db.contacts.createIndex({ gender: 1 });

db.contacts.explain('executionStats').find({gender: 'male'})
db.contacts.dropIndex({gender: 1})

db.contacts.createIndex({"dob.age": 1, gender: 1})
db.contacts.explain().find({"dob.age": 35, gender: 'male'})  // IXSCAN
db.contacts.explain().find({gender: "male"}) // COLLSCAN


// USING INDEXES FOR SORTING

db.contacts.explain().find({"dob.age": 35}).sort({gender: 1})

db.contacts.getIndexes()

// CONFIGUIRING INDEXES

db.contacts.createIndex({email: 1}, {unique: true})

// PARTIAL FILTERS
// In partial indexes, its size is lower compare to compound indexes, as it will only store gender male
db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: "male" } }
);

db.contacts.createIndex({"dob.age": 1}, {partialFilterExpression: {"dob.age": {$gt: 60}}})

// APPLYING PARTIAL INDEXES

db.users.createIndex({email: 1}, {unique: true, partialFilterExpression: {email: {$exists: true}}})

 db.users.insertOne({name: 'Anna', email: 'max@test.com'})
// MongoServerError: E11000 duplicate key error collection: contactData.users index: email_1 dup key: { email: "max@test.com" }
// Error coz email is set as an index 

// TIME-TO-LIVE (TTL)

db.sessions.insertOne({ data: "lkjhgfdsa", created_at: new Date() });
db.sessions.find();
db.sessions.createIndex({ created_at: 1 });
 db.sessions.dropIndex({ created_at: 1 });

//  expiresAfterSeconds- Works on data objects & do not works on compound indexes
db.sessions.createIndex({created_at: 1}, {expiresAfterSeconds: 10}) // not gets deletedd after 10 seconds but when new element inserted the whole doc get reevaluated & after 10 seconds both records gets deletes

db.sessions.insertOne({ data: "poiuytrew", created_at: new Date() });


// HOW MONGODB REJECTS A PLAN

db.customers.createIndex({ age: 1, name: 1 }); 
 
db.customers.explain().find({ name: "Max", age: 30 }); // Order doesn't matter

// USING MULTI-KEY INDEXES

db.contacts.insertOne({name: 'Max', hobbies: ['Cooking', 'Sports'], addresses: [{street: 'Main Street'}, {street: 'Second Street'}]})

 db.contacts.createIndex({ hobbies: 1 });

 db.contacts
   .explain("executionStats")
   .find({ "addresses.street": "Main Street" }); // COLLSCAN

db.contacts.explain('executionStats').find({addresses: {street: 'Main Street'}}) // IXSCAN

 db.contacts.createIndex({ "addresses.street": 1 });

 db.contacts
   .explain("executionStats")
   .find({ "addresses.street": "Main Street" }); // IXSCAN

db.contacts.createIndex({ name: 1, hobbies: 1 });

db.contacts.createIndex({addresses: 1, hobbies: 1})
// MongoServerError: Index build failed: 999e3c15-edaa-4ee7-8c84-a0e52abe6ade: Collection contactData.contacts ( cd672a82-36a0-47c6-9761-2f3d3432a0a3 ) :: caused by :: 
// cannot index parallel arrays [hobbies] [addresses]


// 'TEXT' INDEXES

db.products.insertMany([
  { title: "A Book", description: "This is a awesome book by young artist!" },
  { title: "Red T-shirt", description: "This red T-shirt is pretty" },
]);

db.products.createIndex({description: 1})
db.products.dropIndex({description: 1})

// Special kind of index i.e. text index that will remove the stopwords from sentence & store all the keywords in an array essentially
db.products.createIndex({ description: "text" });

db.products.find({$text: {$search: "awesome"}}).pretty()

db.products.find({ $text: { $search: "book" } }).pretty();

// It will give ouput as if in one description if its 'red' then return & in another if it has 'book' then it will return
db.products.find({ $text: { $search: "red book" } }).pretty();

// It will search 'red book' together & not individually
db.products.find({$text: {$search: "\"red book\""}})
 db.products.find({ $text: { $search: '"awesome book"' } });


// TEXT INDEXES & SORTING

db.products.find({$text: {$search: "awesome t-shirt"}}, {score: {$meta: "textScore"}}).pretty()

db.products
  .find(
    { $text: { $search: "awesome t-shirt" } },
    { score: { $meta: "textScore" } }
  )
  .sort({score: {$meta: "textScore"}}).pretty();

// CREATING COMBINED TEXT INDEXES

db.products.createIndex({title: 1}) // Already exists
db.products.dropIndex({title: 1}) // this index not defined'
db.products.dropIndex("description_text")  // deleted

db.products.createIndex({title: 'text', description: 'text'}) // Output: title_text_description_text

db.products.insertOne({ title: "A Ship", description: "Floats Perfectly!" });

db.products.find({$text: {$search: "ship"}})

// USING TEXT INDEXES TO EXCLUDE WORDS

// Here awesome minus t-shirt is done so to get output of only awesome & not a description which includes t-shirt & awesome both in that same line
db.products.find({ $text: { $search: "awesome - t-shirt" } });

// SETTING THE DEFAULT LANGUAGE & USING WEIGHTS

db.products.createIndex({title: "text", description: "text"}, {default_language: "english", weights: {title: 1, description: 10}})

db.products.find({$text: {$search: "", $language: "german"}})
db.products.find({ $text: { $search: "", $caseSensitive: true } })
db.products.find({ $text: { $search: "red" } })

db.products.createIndex({title: "text", description: "text"}, {default_language: "english"})


// BUILDING INDEXES

 db.ratings.createIndex({ age: 1 });
 db.ratings.dropIndex({ age: 1 });

 db.ratings.createIndex({ age: 1, background: true });

 db.ratings.explain("executionStats").find({ age: { $gt: 80 } });
