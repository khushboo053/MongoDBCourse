// AGGREGATION FRAMEWORK

db.persons.aggregate([{ $match: { gender: "female" } }]);

// GROUP STAGE
db.persons.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
  { $sort: { totalPersons: -1 } },
]);

// $PROJECT
// $ sign indicates that $name is a incoming field & not a hard coded document llike "Hello World"
db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        //   birthdate: { $convert: { input: "$dob.date", to: "date" } },
        birthdate: { $toDate: "$dob.date" },
        age: "$dob.age",
        location: {
          type: "Point",
          coordinates: [
            {
              $convert: {
                input: "$location.coordinates,longitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: "$location.coordinates,longitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullname: {
          $concat: [
            { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
            {
              $substrCP: [
                "$name.first",
                1,
                { $subtract: [{ $strLenCP: "$name.first" }, 1] },
              ],
            },
            " ",
            { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
            {
              $substrCP: [
                "$name.last",
                1,
                { $subtract: [{ $strLenCP: "$name.last" }, 1] },
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          birthYear: { $isoWeekYear: "$birthdate" },
        },
        numPersons: { $sum: 1 },
      },
    },
  ])
  .pretty();

// PUSHING ELEMENTS INTO NEWLY CREATED ARRAYS

db.friends
  .aggregate([
    { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } },
  ])
  .pretty();

db.friends.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } },
]);

// $addToSet also pushes but avoid duplicate values
db.friends.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } },
]);

// USING PROJECTION IN ARRAYS
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      examScore: { $slice: ["$examScores", 2, 1] },
    },
  },
]);

// LENGTH OF AN ARRAY
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      numScores: { $size: ["$examScores"] },
    },
  },
]);

// $FILTER OPERATOR
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      scores: {
        $filter: {
          input: "$examScores",
          as: "sc",
          cond: { $gt: ["$$sc.score", 60] },
        },
      },
    },
  },
]);

// APPLYING MULTIPLE OPERATIONS TO OUR ARRAY
db.friends
  .aggregate([
    { $unwind: "$examScores" },
    { $project: { _id: 1, name: 1, age: 1, score: "$examScores.score" } },
    { $sort: { score: -1 } },
    { $group: { _id: "$_id", maxScore: { $max: "$score" } } },
    { $sort: { maxScore: -1 } },
  ])
  .pretty();

// $BUCKET
db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: "$dob.age",
        boundaries: [18, 30, 40, 50, 60, 120],
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: "$dob.age" },
        },
      },
    },
  ])
  .pretty();

db.persons
  .aggregate([
    {
      $bucketAuto: {
        groupBy: "$dob.age",
        buckets: 3,
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: "$dob.age" },
        },
      },
    },
  ])
  .pretty();

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: { $concat: ["$name.first", " ", "$name.last"] },
      birthdate: { $toDate: "$dob.date" },
    },
  },
  { $skip: 10 },
  { $limit: 10 },
  { $sort: { birthdate: 1 } },
]);

// Give no output coz gender is matched after projection & in projection gender is not included
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: { $concat: ["$name.first", " ", "$name.last"] },
      birthdate: { $toDate: "$dob.date" },
    },
  },
  { $sort: { birthdate: 1 } },
  { $match: { gender: "male" } },
  { $skip: 10 },
  { $limit: 10 },
]);

db.persons.aggregate([
  { $match: { gender: "male" } },
  {
    $project: {
      _id: 0,
      gender: 1,
      name: { $concat: ["$name.first", " ", "$name.last"] },
      birthdate: { $toDate: "$dob.date" },
    },
  },
  { $sort: { birthdate: 1 } },
  { $skip: 10 },
  { $limit: 10 },
]);

// WRITING PIPELINE RESULTS INTO NEW COLLECTION
db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: "$dob.date" },
        age: "$dob.age",
        location: {
          type: "Point",
          coordinates: [
            {
              $convert: {
                input: "$location.coordinates.longitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: "$location.coordinates.latitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
            {
              $substrCP: [
                "$name.first",
                1,
                { $subtract: [{ $strLenCP: "$name.first" }, 1] },
              ],
            },
            " ",
            { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
            {
              $substrCP: [
                "$name.last",
                1,
                { $subtract: [{ $strLenCP: "$name.last" }, 1] },
              ],
            },
          ],
        },
      },
    },
    { $out: "transformedPersons" },
  ])
  .pretty();

// $GEONEAR STAGE
db.transformedPersons.createIndex({ location: "2dsphere" });

db.transformedPersons.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [-18.4, -42.8] },
      maxDistance: 1000000,
      query: { age: {$gt: 30 }},
      distanceField: "distance"
    },
  },
]);
