require("dotenv").config();
const mongoose = require("mongoose");
const { db } = require("./models/dishes");

const Dishes = require("./models/dishes");
const url = process.env.MONGO_DB || `mongodb://localhost:27017/`;

mongoose
  .connect(url)
  .then((db) => {
    console.log("Connected correctly to server.");

    const newDish = Dishes({
      name: "Uthappizza",
      description: "Test Pizza",
    });

    return newDish.save();
  })
  .then((dish) => {
    console.log(dish);
    return Dishes.find({}).exec();
  })
  .then((dishes) => {
    console.log(dishes);
    return Dishes.deleteMany({});
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
