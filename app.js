require("dotenv").config();
const mongoose = require("mongoose");

const Dishes = require("./models/dishes");
const url = process.env.MONGO_DB || `mongodb://localhost:27017/`;

mongoose
  .connect(url)
  .then((db) => {
    console.log("Connected correctly to server.");
    return Dishes.create({
      name: "Uthappizza",
      description: "Test Pizza",
    });
  })
  .then((dish) => {
    console.log(dish);
    return Dishes.find({}).exec();
  })
  .then((dishes) => {
    console.log(dishes);
    return Dishes.deleteMany({});
  })
  .then((result) => {
    console.log(result);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Disconnected.");
  })
  .catch((err) => {
    console.log(err);
  });
