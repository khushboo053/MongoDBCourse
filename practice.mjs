db.restaurants.find();

db.restaurants.find(
  {},
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
);

db.restaurants.find({ borough: "Bronx" }).skip(5).limit(5);

db.restaurants.find({ grades: { $elemMatch: { score: { $gt: 90 } } } });

db.restaurants.find({
  grades: { $elemMatch: { score: { $gt: 80, $lt: 100 } } },
});

db.restaurants.find({
  address: { $elemMatch: { coord: { $lt: -95.754168 } } },
});
db.restaurants.find({ "address.coord": { $lt: -95.754168 } });

db.restaurants.find({
  $and: [
    { cuisine: { $ne: "American" } },
    { "grades.score": { $gt: 70 } },
    { "address.coord": { $lt: -65.754168 } },
  ],
});

// Movies Collection
db.movies.find({ year: 1893 });

db.movies.find({ runtime: { $gt: 120 } });

db.movies.find({ genres: "Short" });

db.movies.find({ directors: "William K.L. Dickson" });

db.movies.find({ countries: "USA" });

db.movies.find({ rated: "UNRATED" });

db.movies.find({ "imdb.votes": { $gt: 1000 } });

db.movies.find({ "imdb.rating": { $gt: 7 } });

db.movies.find({ awards: { $exists: true } });

db.movies.find(
  { "awards.nomination": { $gt: 0 } },
  {
    title: 1,
    languages: 1,
    released: 1,
    directors: 1,
    writers: 1,
    awards: 1,
    year: 1,
    genres: 1,
    runtime: 1,
    cast: 1,
    countries: 1,
  }
);

db.movies.find(
  { cast: "Charles Kayser" },
  {
    title: 1,
    languages: 1,
    released: 1,
    directors: 1,
    writers: 1,
    awards: 1,
    year: 1,
    genres: 1,
    runtime: 1,
    cast: 1,
    countries: 1,
  }
);

db.movies.find(
  { released: ISODate("1893-05-09T00:00:00.000Z") },
  {
    title: 1,
    languages: 1,
    released: 1,
    directors: 1,
    writers: 1,
    countries: 1,
  }
);

db.movies.find({title: {$regex: /scene/i }},{ 
    title: 1,
    languages: 1,
    released: 1,
    directors: 1,
    writers: 1,
    countries: 1,
  });

db.movies.find(
  {$and: [{"tomatoes.viewer.rating": {$gt: 3}}, {tomatoes: {}} ]},
  {
    title: 1,
    languages: 1,
    released: 1,
    directors: 1,
    writers: 1,
    countries: 1,
  }
);
