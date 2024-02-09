// ASSIGNMENT - 5

db.createCollection("sports");

db.sports.updateOne(
  { title: "Running" },
  { $set: { requiresTeam: false } },
  { upsert: true }
);
db.sports.updateOne(
  { title: "3LegRace" },
  { $set: { requiresTeam: true } },
  { upsert: true }
);

db.sports.updateMany(
  { requiresTeam: true },
  { $min: { minPlayers: 10 } },
  { upsert: true }
);

db.sports.updateMany({ requiresTeam: true }, { $inc: { minPlayers: 10 } });

// ASSIGNMENT - 6

db.places.insertMany([
  {
    name: "Avadh Utopia",
    location: {
      type: "Point",
      coordinates: [72.7190011, 21.1211196],
    },
  },
  {
    name: "Charcoal Hues Design Studio",
    location: {
      type: "Point",
      coordinates: [72.7177544, 21.120883],
    },
  },
  {
    name: "The Wall Street Business Hub",
    location: {
      type: "Point",
      coordinates: [72.7177021, 21.1209248],
    },
  },
]);

db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [72.7193269, 21.1238784],
      },
      $maxDistance: 200,
      $minDistance: 10,
    },
  },
});

const p1 = [];
const p2 = [];
const p3 = [];
const p4 = [];

db.places.find({
  location: {
    $geoWithin: {
      $geometry: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
    },
  },
});

// ASSIGNMENT - 7

// Persons age > 50, group by gender, no. of persons by gender, avg age then is, order by totalpersons per gender
db.persons.aggregate([
  { $match: { "dob.age": { $gt: 50 } } },
  {
    $group: {
      _id: { gender: "$gender" },
      totalPersons: { $sum: 1 },
      avgAge: { $avg: "$dob.age" },
    },
  },
  { $sort: { totalPersons: 1 } },
]);

// ASSIGNMENT - 8
// Create 3 users: Database admin, user admin & developer

// use admin
db.createUser({
  user: "khush",
  pwd: "khush",
  roles: ["userAdminAnyDatabase"],
});

db.auth("khush", "khush");

db.createUser({
  user: "globalAdmin",
  pwd: "admin",
  roles: ["dbAdminAnyDatabase"],
});

db.createUser({
  user: "dev",
  pwd: "dev",
  roles: [
    { role: "readWrite", db: "customers" },
    { role: "readWrite", db: "sales" },
  ],
});

// mongosh -u globalAdmin -p admin --authenticationDatabase admin
// mongosh -u dev -p dev --authenticationDatabase admin

