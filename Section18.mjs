// FUNCTIONS & TRIGGERS

// Database Trigger
exports = async function (changeEvent) {
  console.log("Document Inserted");
  console.log(`Chocalate's name was ${changeEvent.fullDocument.name}`);
  console.log(`Chocalate's price is ${changeEvent.fullDocument.price}`);
};

// Scheduled Trigger : In  this it doesn't require to add db name & collection name, it gets keep running no matter what happen to database it just run after every specific interval of time
exports = function () {
  console.log("Scheduled Trigger has run!");
};

