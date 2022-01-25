const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url2 =
  "mongodb+srv://choieunsoh:2SXqQNgWF6n7FYsT@cluster0.jd2nr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
const dbname = `conFusion`;

MongoClient.connect(url2, (err, client) => {
  assert.equal(err, null);
  console.log(`Connected correctly to server.`);

  const db = client.db(dbname);
  const dishes = db.collection("dishes");
  dishes.insertOne(
    { name: "Uthappizza", description: "Test" },
    (err, result) => {
      assert.equal(err, null);
      console.log(`After Insert:`);
      console.log(result);

      dishes.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Found:\n`);
        console.log(docs);

        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);

          client.close();
        });
      });
    }
  );
});
