// ORDERED INSERTS
db.hobbies.insertMany(
  [
    { _id: "yoga", name: "Yoga" },
    { _id: "sports", name: "Sports" },
    { _id: "hiking", name: "Hiking" },
  ],
  { ordered: false }
);

// WRITECONCERN
 db.persons.insertOne(
   { name: "Aliya", age: 20 },
   { writeConcern: { w: 1, j: true, wtimeout: 200 } }
 );