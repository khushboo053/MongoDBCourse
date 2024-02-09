// use databaseName
db.dropDatabase()
db.collection.drop()

//  db.companies.insertOne({
// ... name: 'Fresh Apples',
// ... isStartup: true,
// ... employees: 50,
// ... funding: 12345678990123456789,
// ... details: {ceo: 'Mark super'},
// ... tags: [{title: 'super'}, {title: 'perfect'}],
// ... foundingDate: new Date(),
// ... insertedAt: new Timestamp()
// ... })

db.numbers.insertOne({ a: 1 });

 db.numbers.findOne();

 db.stats();

 db.numbers.insertOne({a: NumberInt(1)})

 
var dsid = db.patients.findOne().diseaseSummary
dsid

 db.diseaseSummary.insertOne({
   _id: "summary",
   diseases: ["cold", "broken leg"],
 });

 db.diseaseSummary.findOne({ _id: dsid });


//  ONE TO ONE USING REFERENCES
 /*
 car> db.persons.insertOne({name: 'emily', age: 30, salary: 30000})
{
  acknowledged: true,
  insertedId: ObjectId('65b88195cd5fcb6404a67c70')
}
car> db.cars.insertOne({model: 'BMW', price: 200000, owner: ObjectId('65b88195cd5fcb6404a67c70')})
{
  acknowledged: true,
  insertedId: ObjectId('65b881c3cd5fcb6404a67c71')
}
car> db.cars.find()
[
  {
    _id: ObjectId('65b881c3cd5fcb6404a67c71'),
    model: 'BMW',
    price: 200000,
    owner: ObjectId('65b88195cd5fcb6404a67c70')
  }
]
*/


// ONE TO MANY
/*
db.questionThreads.insertOne(
... {
...     creator: 'Colt Steele',
...     question: 'How does that all work?',
...     answers: ['q1a1', 'q1a2']
... }
... )

 db.answers.insertMany([{
... _id: 'q1a1',
... text: 'It works like that.'
... },
... {
... _id: 'q1a2',
... text: 'Thanks!'
... }
... ])
*/




db.books.aggregate([
  {
    $lookup: {
      from: "authors",
      localField: "authors",
      foreignField: "_id",
      as: "creators",
    },
  },
]);