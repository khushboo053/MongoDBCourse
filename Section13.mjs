// WORKING WITH NUMERIC DATA
// WORKING WITH INT32
// javaScript does NOT differentiate between integers and floating point numbers => Every number is a 64bit float instead.

// So 12 and 12.0 are exactly the same number in JavaScript and therefore also in the Shell.

// WORKING WITH INT64
db.companies.insertOne({ valuation: NumberInt("500000000000") });

db.companies.find();
// Output:  { _id: ObjectId('65bcd50e6e582c647c0c2cda'), valuation: 1783793664 }
// This output comes coz it exceeds the value

db.companies.insertOne({ valuation: 2145687930125 });
// Output: { _id: ObjectId('65bcd5b06e582c647c0c2cdb'), valuation: 2145687930125 }

db.companies.insertOne({ valuation: NumberLong(21456307890) });
// Output: { _id: ObjectId('65bcd6546e582c647c0c2cdc'), valuation: Long('21456307890') }

db.companies.insertOne({ valuation: NumberLong(9223372036854775807) });
// Warning: NumberLong: specifying a number as argument is deprecated and may lead to loss of precision, pass a string instead

db.companies.insertOne({ valuation: NumberLong("9223372036854775807") });

db.accounts.insertOne({
  name: "Max",
  amount: "10",
});

db.accounts.updateOne({}, { $inc: { amount: 10 } });
// MongoServerError: Cannot apply $inc to a value of non-numeric type. {_id: ObjectId('65bcd8fe6e582c647c0c2ce0')} has the field 'amount' of non-numeric type string

db.accounts.deleteMany({});

db.accounts.insertOne({ name: "Max", amount: NumberInt("10") });
db.accounts.updateOne({}, { $inc: { amount: 10 } });

db.companies.insertOne({ valuation: NumberLong("123456789123456789") }); // 123456789123456789
db.companies.updateOne({}, { $inc: { valuation: 1 } }); // 123456789123456789
db.companies.updateOne({}, { $inc: { valuation: NumberLong("1") } }); // 1234567891234567890

// PROBLEM WITH NORMAL DOUBLES
db.science.insertOne({ a: 0.3, b: 0.1 });
db.science.aggregate([
  {
    $project: { result: { $subtract: ["$a", "$b"] } },
  },
]); // 0.19999999999999998

// WORKING WITH DECIMAL 128 BIT

db.science.insertOne({ a: NumberDecimal("0.3"), b: NumberDecimal("0.1") });
db.science.aggregate([
  {
    $project: { result: { $subtract: ["$a", "$b"] } },
  },
]); // 0.2
db.science.updateOne({}, { $inc: { a: 0.1 } });

db.nums.insertOne({ a: 0.1 });
db.nums.stats(); // size: 33

db.nums.insertOne({ a: NumberDecimal("0.1") });
db.nums.stats(); // size: 41
