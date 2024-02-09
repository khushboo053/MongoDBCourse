// PERFORMANCE, FAULT TOLERANCY & DEPLOYMENT

// Understanding capped collections
// use performance;
db.createCollection("capped", { capped: true, size: 10000, max: 3 });

// In capped collection document, the order in which docs have been inserted is same when it is displayed
// Capped Collections delete the old data and insert the new one when it exceeds the length of inserting data
db.capped.insertOne({ name: "Max" });
db.capped.insertOne({ name: "Blue" });
db.capped.insertOne({ name: "Anna" });

db.capped.find()[
  ({ _id: ObjectId("65c1f4c707a58a05db82f611"), name: "Max" },
  { _id: ObjectId("65c1f4cd07a58a05db82f612"), name: "Blue" },
  { _id: ObjectId("65c1f4d407a58a05db82f613"), name: "Anna" })
];

db.capped.find().sort({ natural: -1 })[
  ({ _id: ObjectId("65c1f4c707a58a05db82f611"), name: "Max" },
  { _id: ObjectId("65c1f4cd07a58a05db82f612"), name: "Blue" },
  { _id: ObjectId("65c1f4d407a58a05db82f613"), name: "Anna" })
];

db.capped.insertOne({ name: "Maria" });

db.capped.find().sort({ natural: -1 })[
  ({ _id: ObjectId("65c1f4cd07a58a05db82f612"), name: "Blue" },
  { _id: ObjectId("65c1f4d407a58a05db82f613"), name: "Anna" },
  { _id: ObjectId("65c1f5d007a58a05db82f614"), name: "Maria" })
];

db.capped.find().sort({ natural: -1 })[
  ({ _id: ObjectId("65c1f4d407a58a05db82f613"), name: "Anna" },
  { _id: ObjectId("65c1f5d007a58a05db82f614"), name: "Maria" },
  { _id: ObjectId("65c1f60d07a58a05db82f615"), name: "Emily" })
];


// CONNECTING TO CLUSTER
/*
USERNAME: khushboomakhija053;
PASSWORD: uAFXiZeZnjg2rKcl;
LINK: mongosh "mongodb+srv://cluster0.4kl7wec.mongodb.net/" --apiVersion 1 --username khushboomakhija053
*/