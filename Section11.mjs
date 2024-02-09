// WORKING WITH GEOSPATIAL DATA

// ADDING GEOJSON DATA
// coordinates: [longitude, latitude]

 db.places.insertOne({
   name: "Surat terminal Airport",
   location: { type: "Point", coordinates: [72.737638, 21.1204751] },
 });


// RUNNING GEO QUERIES

db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [72.737638, 21.1204751] },
    },
  },
})

// MongoServerError: error processing query: ns=awesomeplaces.placesTree: GEONEAR  field=location maxdist=1.79769e+308 isNearSphere=0
// Sort: {}
// Proj: {}
//  planner returned error :: caused by :: unable to find index for $geoNear query


// ADDING A GEOSPATIAL INDEX TO TRACK DISTANCE
db.places.createIndex({location: "2dsphere"})

db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [72.737638, 21.1204751] },
    },
  },
});

// Find the places which are nearer to this coordinates
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
    }
  },
])

// FINDING PLACES INSIDE A CERTAIN AREA
// const p = [lng, lat]
const p1 = []
const p2 = []
const p3 = []
const p4 = []


// can help to find elements in a certain shape typically such as like a polygon
// at end p1 is again added coz polygon is ended at starting point so that it is treated as complete
db.places.find({location: {$geoWithin: {$geometry: {type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]]}}}})


// FINDINF OUT IF A USER IS INSIDE A SPECIFIC AREA

db.areas.insertOne({
  name: "Business Hub",
  area: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
})

db.areas.find()

db.areas.createIndex({area: "2dsphere"})

db.area.find({
  area: {
    $geoIntersects: {
      $geometry: { type: "Point", coordinates: [72.7190011, 21.1211196] },
    },
  },
})


// FINDING PLACES WITHIN A CERTAIN RADIUS

// coordinates should be of centre of sphere
db.places.find({location: {$geoWithin: {$centerSphere: [[], 1 / 6378.1]}}})

db.places.updateOne({_id: ObjectId("")}, {$set: {location: {type: "Point", coordinates: [ ]}}})