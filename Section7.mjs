// QUERYING EMBEDDED FIELDS & ARRAYS
// Comparison Operators: eq, ne, lt, lte, gt, gte, in, nin

db.movies.find({ "network.country.name": { $eq: "United States" } });

db.movies.find({ genres: "Drama" });
db.movies.find({ genres: ["Drama"] });
 db.movies.find({ genres: { $eq: ["Drama"] } });
 db.movies.find({ genres: { $eq: "Drama" } });

  db.movies.find({ "rating.average": { $gt: 9.3 } }).count();
   db.movies.find({ runtime: 60 } ).limit(3);


// Logical operators : $or
db.movies.find({
  $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }],
});

db.movies
  .find({
    $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }],
  })
  .count();

db.movies
  .find({
    $nor: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }],
  })
  .count();


 db.movies.find({
   $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }],
 });

  db.movies
    .find({ $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }] })
    .count(); // 3

    db.movieStarts
      .find({
        $and: [
          { "meta.rating": { $gt: 9.2 } },
          { "meta.runtime": { $lt: 100 } },
        ],
      })
      .pretty();

// Default mongodb filter all the conditions
 db.movies.find({ "rating.average": { $gt: 9 }, genres: "Drama" }).count(); // 3

//  This will not work in all drivers coz in JS, repeat names in same objects is not permitted
 db.movies.find({genres: "Drama", genres: "Horror"}).count() // 23
  db.movies.find({ genres: "Horror" }).count(); // 23

// So u can work with $and
 db.movies.find({$and: [{ genres: "Drama"}, {genres: "Horror" }]}).count(); // 17

 db.movies.find({ runtime: { $not: { $eq: 60 } } }).count(); // 70
 
 db.movies.find({ runtime: { $ne: 60 } }).count(); // 70


//  Element Operators

 db.users.find({ age: { $exists: true } }).pretty();
  db.users.find({ age: { $exists: true, $gte: 20 } }).pretty();

db.users.insertOne({
  name: "Camille",
  hobbies: [
    { title: "Singing", frequency: 5 },
    { title: "Cokking", frequency: 7 },
  ],
  phone: 9632145078,
  age: null,
});

 db.users.find({ age: { $exists: true, $ne: null } });

 db.users.find({ phone: { $type: "number" } });
 db.users.find({ phone: { $type: ["double", "string"] } });



// Evaluation Operators
db.movies.find({ summary: { $regex: /musical/ } });

 db.sales.find({ $expr: { $gt: ["$volume", "$target"] } }).pretty();

db.sales.find({$expr: {$gt: [{$cond: {if: {$gte: ["$volume", 190]}, then: {$subtract: ["$volume", 30]}, else: "$volume" }}, "$target"]}}).pretty()

 db.movieStarts.find({ $expr: { $gt: ["$visitors", "$expectedVisitors"] } });



//  ARRAY QUERY SELECTORS

 db.users.insertOne({
   name: "Chris",
   hobbies: ["Sports", "Cooking", "Hiking"],
 });

 db.users.find({ hobbies: { $size: 3 } });

 // This will match with the order  of elements in array
 db.movieStarts.find({ genre: ["action", "thriller"] });

//  This will give output  if there is any element present or not in an array & doesnt care abt the order
  db.movieStarts.find({ genre: { $all: ["action", "thriller"] } });


// In this, it is displaying all elements of hobbies array as only 1 element is matched 
   db.users.find({
     $and: [
       { "hobbies.title": "sports" },
       { "hobbies.frequency": { $gte: 2 } },
     ],
   });

//  But if i want only that matched element only then how can I do? using this:
db.users
  .find({
    hobbies: { $elemMatch: { title: "sports", frequency: { $gte: 3 } } },
  })
  .pretty();

  db.exmoviestarts.find({ ratings: { $elemMatch: { $gt: 8, $lt: 10 } } });


// CURSORS

const dataCursor = db.movieStarts.find();
dataCursor.next();

dataCursor.forEach((doc) => {
  printjson(doc);
});

 dataCursor.hasNext();


//  SORTING 

db.movies.find().sort({ "rating.average": 1 }).pretty(); // ASC

db.movies.find().sort({ "rating.average": -1 }).pretty(); // DESC

// Can also sort using multiple fields

db.movies.find().sort({ "rating.average": 1, runtime: 1 }).pretty();

db.movies
  .find({}, { rating: 1, runtime: 1 })
  .sort({ "rating.average": -1, runtime: 1 })
  .pretty();

// PAGINATION
db.movies.find({}, {rating: 1, runtime: 1}).sort({"rating.average": -1, runtime: 1}).skip(10).pretty()

db.movies
  .find({}, { rating: 1, runtime: 1 })
  .sort({ "rating.average": -1, runtime: 1 })
  .skip(100)
  .limit(5)
  .pretty();


  // PROJECTION IN EMBEDDED DOCS
db.movies.find({}, { name: 1, genres: 1, runtime: 1, rating: 1, _id: 0 });
db.movies.find(
  {},
  {
    name: 1,
    genres: 1,
    runtime: 1,
    "rating.average": 1,
    "schedule.time": 1,
    _id: 0,
  }
);



// PROJECTION IN ARRAYS

// To find the first match in the query here
 db.movies.find({ genres: "Drama" }, { "genres.$": 1 });

 // In this its also displaying the record which has drama & horror both
 db.movies.find({ genres: { $all: ["Drama", "Horror"] } }, { "genres.$": 1 });
  db.movies.find({ genres: { $all: ["Drama", "Horror", "Action"] } }, { "genres.$": 1 });

// In this its also displaying the record which has only drama
  db.movies.find(
    { genres: "Drama" },
    { genres: { $elemMatch: { $eq: "Horror" } } }
  );

 db.movies.find(
   { "rating.average": { $gt: 9 } },
   { genres: { $elemMatch: { $eq: "Horror" } } }
 );

 db.movies.find(
   { "rating.average": { $gt: 9 } },
   { genres: { $slice: 2 }, name: 1 }
 );

//  Skip the first element in array & print after 2 elements in array 
  db.movies.find(
    { "rating.average": { $gt: 9 } },
    { genres: { $slice: [1, 2] }, name: 1 }
  );