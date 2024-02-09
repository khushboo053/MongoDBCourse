// MONGODB & SECURITY
// Authentication verifies the identity of a user.
// Authorization determines the verified user's access to resources and operations.


// CREATING A USER
// use admin;

db.createUser({
  user: "khushboo",
  pwd: "khushboo",
  roles: ["userAdminAnyDatabase"],
});

// To authenticate
// use admin
db.auth("khushboo", "khushboo");

// show collections

// ASSIGNING ROLES TO USERS & DATABASES
// use shop
db.createUser({ user: "appdev", pwd: "dev", roles: ["readWrite"] });
db.auth("appdev", "dev");
db.products.insertOne({ name: "Book" });
db.logout();

// mongosh -u appdev -p dev --authenticationDatabase admin // authentication failed
// mongosh -u appdev -p dev --authenticationDatabase shop // authentication successfull

// use shop
db.products.insertOne({ name: "A Book" });

// UPDATING & EXTENDING ROLES TO OTHER DATABASES
// use shop

// db.updateUser({"appdev", {roles: ["readWrite", {role: "readWrite", db: "blog" }]}})
db.getUser("appdev");
db.logout();

// use shop
db.auth("appdev", "dev");
// use blog
db.posts.insertOne({ title: "This works!" });

// openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out mongodb-cert.crt -keyout mongodb-cert.key