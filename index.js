require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dbOps = require("./operations");

const url = process.env.MONGO_DB || `mongodb://localhost:27017/`;
const dbname = `conFusion`;

MongoClient.connect(url)
  .then((client) => {
    console.log(`Connected correctly to server.`);

    const db = client.db(dbname);
    const collName = "dishes";
    const pizza = { name: "Seafood Pizza", description: "Test Pizza" };
    dbOps
      .insertDocument(db, pizza, collName)
      .then((result) => {
        console.log("Insert document\n", result);
        return dbOps.findDocuments(db, collName);
      })
      .then((documents) => {
        console.log("Found documents\n", documents);
        return dbOps.updateDocument(
          db,
          pizza,
          { description: "Updated Pizza" },
          collName
        );
      })
      .then((result) => {
        console.log("Update document\n", result);
        return dbOps.findDocuments(db, collName);
      })
      .then((documents) => {
        console.log("Found documents\n", documents);
        return db.dropCollection(collName);
      })
      .then((result) => {
        console.log("Drop collection\n", result);
        return client.close();
      })
      .then(() => {
        console.log("Connection closed.");
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
