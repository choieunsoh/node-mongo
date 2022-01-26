require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dbOps = require("./operations");

const url = process.env.MONGO_DB || `mongodb://localhost:27017/`;
const dbname = `conFusion`;

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log(`Connected correctly to server.`);

  const db = client.db(dbname);
  const collName = "dishes";
  dbOps.insertDocument(
    db,
    { name: "Pizza", description: "Test Pizza" },
    collName,
    (result) => {
      console.log("Insert document\n", result);

      dbOps.findDocuments(db, collName, (documents) => {
        console.log("Found documents\n", documents);

        dbOps.updateDocument(
          db,
          { name: "Pizza" },
          { description: "Updated desc" },
          collName,
          (result) => {
            console.log("Update document\n", result);

            dbOps.findDocuments(db, collName, (documents) => {
              console.log("Found documents\n", documents);

              db.dropCollection(collName, (result) => {
                console.log("Drop collection\n", result);

                client.close();
              });
            });
          }
        );
      });
    }
  );
});
