db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be string & is required",
        },
        text: {
          bsonType: "string",
          description: "must be string & is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be objectId & is required",
        },
        comments: {
          bsonType: "array",
          description: "must be array & is required",
          items: {
            bsonType: "object",
            required: ["author", "text"],
            properties: {
              author: {
                bsonType: "objectId",
                description: "must be objectId & is required",
              },
              text: {
                bsonType: "string",
                description: "must be string & is required",
              },
            },
          },
        },
      },
    },
  },
});