// TRANSACTIONS

// use blog
db.users.insertOne({ name: "Blue" });

db.posts.insertOne({
  title: "First Post",
  userId: " ObjectId('65c212291545494d8f6494de')",
});

db.posts.insertOne({
  title: "Second Post",
  userId: " ObjectId('65c212291545494d8f6494de')",
});

db.posts.deleteMany({ userId: " ObjectId('65c212291545494d8f6494de')" });

// For a transaction we need so called session
// Session means all our requests are grouped together logically.

// Session is required coz technically every command I issue is sent to the server & then normally server would forget me

// therefore we need that session so that when I send something based on that session, the server remembers oh that session which behind the scenes is managed through a session key

const session = db.getMongo().startSession();
session.startTransaction();

// use blog
const userCol = session.getDatabase("blog").users;
const postsCol = session.getDatabase("blog").posts;

userCol.deleteOne({ _id: ObjectId("65c212291545494d8f6494de") });
db.users.find(); // the user doesnt get deleted

postsCol.deleteMany({ _id: ObjectId("65c212291545494d8f6494de") });
db.posts.find();

session.commitTransaction();
db.users.find(); // deleted
